import { createHash, timingSafeEqual } from 'node:crypto'
import { resolve } from 'node:path'
import { loadEnvFile } from 'node:process'
import { fileURLToPath } from 'node:url'
import express from 'express'
import jwt from 'jsonwebtoken'
import { contentSchema, openContentStore } from './content.mjs'

try {
  loadEnvFile()
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

const username = process.env.CV_ADMIN_USERNAME
const password = process.env.CV_ADMIN_PASSWORD
const secret = process.env.CV_JWT_SECRET
if (!username || !password || !secret || Buffer.byteLength(secret) < 32) {
  throw new Error('Set CV_ADMIN_USERNAME, CV_ADMIN_PASSWORD and a CV_JWT_SECRET of at least 32 bytes.')
}

const root = fileURLToPath(new URL('.', import.meta.url))
const content = await openContentStore(
  resolve(root, process.env.CV_CONTENT_FILE ?? 'data/content.json'),
  new URL('../front/src/mockData.json', import.meta.url)
)
const origins = (process.env.CV_APP_ORIGINS ?? 'http://localhost:3000')
  .split(',').map(value => new URL(value.trim()).origin)
const port = Number(process.env.CV_PORT ?? 19391)
const cookieName = 'cv_admin'
const sessionSeconds = 2 * 60 * 60
const issuer = 'cv-backend'
const cookieOptions = { httpOnly: true, secure: true, sameSite: 'strict', path: '/api' }

const app = express()
app.disable('x-powered-by')
app.disable('etag')
app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

const json = express.json({ limit: '128kb' })

function requireOrigin(req, res, next) {
  if (!origins.includes(req.get('origin'))) {
    return res.status(403).json({ error: 'Request origin is not allowed.' })
  }
  next()
}

function requireAdmin(req, res, next) {
  const cookie = req.headers.cookie?.split(';').map(part => part.trim())
    .find(part => part.startsWith(`${cookieName}=`))
  try {
    jwt.verify(cookie?.slice(cookieName.length + 1) ?? '', secret, {
      algorithms: ['HS256'],
      issuer,
      audience: 'cv-admin',
      subject: username
    })
  } catch {
    return res.status(401).json({ error: 'Sign in to continue.' })
  }
  next()
}

function sendContent(res, { etag, json: body }) {
  res.set('ETag', etag).type('json').send(body)
}

const digest = value => createHash('sha256').update(value).digest()
const adminPassword = digest(password)

app.get('/api/content', (_req, res) => sendContent(res, content.read()))

app.post('/api/auth/login', requireOrigin, json, (req, res) => {
  const suppliedPassword = req.body?.password
  const matches = typeof suppliedPassword === 'string' &&
    timingSafeEqual(digest(suppliedPassword), adminPassword)
  if (req.body?.username !== username || !matches) {
    return res.status(401).json({ error: 'Incorrect username or password.' })
  }

  const token = jwt.sign({}, secret, {
    algorithm: 'HS256', issuer, audience: 'cv-admin', subject: username, expiresIn: sessionSeconds
  })
  res.cookie(cookieName, token, { ...cookieOptions, maxAge: sessionSeconds * 1000 }).sendStatus(204)
})

app.get('/api/auth/session', requireAdmin, (_req, res) => res.sendStatus(204))

app.post('/api/auth/logout', requireOrigin, (_req, res) => {
  res.clearCookie(cookieName, cookieOptions).sendStatus(204)
})

app.put('/api/content', requireOrigin, requireAdmin, json, async (req, res) => {
  const ifMatch = req.get('if-match')
  if (!ifMatch) return res.status(428).json({ error: 'Load the current content before saving.' })

  const result = contentSchema.safeParse(req.body)
  if (!result.success) {
    const issue = result.error.issues[0]
    const field = issue.path.join('.') || 'content'
    return res.status(400).json({ error: `Check ${field}. ${issue.message}` })
  }

  const saved = await content.replace(result.data, ifMatch)
  if (!saved) {
    return res.status(412).json({ error: 'Content changed. Reload the page before saving again.' })
  }
  sendContent(res, saved)
})

app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found.' }))
app.use((error, _req, res, _next) => {
  if (error.status === 400 || error.status === 413) {
    return res.status(error.status).json({ error: 'Invalid or oversized JSON request.' })
  }
  console.error(error.message)
  res.status(500).json({ error: 'The request could not be completed.' })
})

const server = app.listen(port, '127.0.0.1', () => {
  console.log(`CV API listening on 127.0.0.1:${server.address().port}`)
})
