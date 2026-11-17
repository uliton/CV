import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import { once } from 'node:events'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createInterface } from 'node:readline'
import test from 'node:test'

test('CV API authenticates, persists changes and rejects stale updates', { timeout: 15000 }, async () => {
  const dir = await mkdtemp(join(tmpdir(), 'cv-api-'))
  const file = join(dir, 'content.json')
  const origin = 'http://localhost:3000'
  const password = 'test-only-password'
  const server = spawn(process.execPath, ['server.mjs'], {
    cwd: new URL('.', import.meta.url),
    env: {
      ...process.env,
      CV_ADMIN_USERNAME: 'demo',
      CV_ADMIN_PASSWORD: password,
      CV_JWT_SECRET: randomBytes(32).toString('hex'),
      CV_CONTENT_FILE: file,
      CV_APP_ORIGINS: origin,
      CV_PORT: '0'
    },
    stdio: ['ignore', 'pipe', 'inherit']
  })
  const exited = once(server, 'exit')

  try {
    const output = createInterface({ input: server.stdout })
    const line = await Promise.race([
      once(output, 'line').then(([value]) => value),
      exited.then(() => { throw new Error('API exited before listening') })
    ])
    const address = line.match(/127\.0\.0\.1:\d+/)?.[0]
    assert.ok(address)
    const request = (path, options) => fetch(`http://${address}/api${path}`, options)
    const json = { Origin: origin, 'Content-Type': 'application/json' }
    const initial = await request('/content')
    assert.equal(initial.status, 200)
    const revision = initial.headers.get('etag')
    const content = await initial.json()

    const login = value => request('/auth/login', {
      method: 'POST', headers: json, body: JSON.stringify({ username: 'demo', password: value })
    })
    assert.equal((await login('incorrect')).status, 401)
    const session = await login(password)
    assert.equal(session.status, 204)
    const setCookie = session.headers.get('set-cookie')
    assert.match(setCookie, /HttpOnly/i)
    assert.match(setCookie, /Secure/i)
    assert.match(setCookie, /SameSite=Strict/i)
    const cookie = setCookie.split(';')[0]
    assert.equal((await request('/auth/session', { headers: { Cookie: cookie } })).status, 204)
    assert.equal((await request('/auth/session')).status, 401)

    const save = (data, version, headers = {}) => request('/content', {
      method: 'PUT',
      headers: { ...json, 'If-Match': version, ...headers },
      body: JSON.stringify(data)
    })
    const description = 'A project description.\nA second line.'
    const role = 'Full-Stack Developer'
    const next = {
      ...content,
      name: 'Updated CV',
      portfolio: [
        content.portfolio[1],
        { ...content.portfolio[0], category: 'game', role, description },
        ...content.portfolio.slice(2)
      ]
    }
    assert.equal((await save(next, revision)).status, 401)
    assert.equal((await save(next, revision, { Cookie: cookie, Origin: 'https://example.com' })).status, 403)
    const auth = { Cookie: cookie }
    assert.equal((await save({ ...next, portfolio: null }, revision, auth)).status, 400)

    const results = await Promise.all([
      save(next, revision, auth),
      save({ ...next, name: 'Concurrent update' }, revision, auth)
    ])
    assert.deepEqual(results.map(response => response.status).sort(), [200, 412])
    const updated = await (await request('/content')).json()
    assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), updated)
    assert.notEqual(updated.name, content.name)
    assert.deepEqual(updated.portfolio.map(project => project.id), next.portfolio.map(project => project.id))
    assert.equal(updated.portfolio[1].category, 'game')
    assert.equal(updated.portfolio[1].role, role)
    assert.equal(updated.portfolio[1].description, description)

    const logout = await request('/auth/logout', { method: 'POST', headers: { Origin: origin, Cookie: cookie } })
    assert.equal(logout.status, 204)
    assert.match(logout.headers.get('set-cookie'), /^cv_admin=;/)
  } finally {
    server.kill()
    await exited
    await rm(dir, { recursive: true, force: true })
  }
})
