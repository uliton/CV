import { createHash } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { z } from 'zod'

const text = z.string().max(10000)
const textList = z.array(text).max(250)
const title = text.trim().min(1)
const item = z.object({ id: z.number().int().positive(), title })
const workDetails = z.object({ title: text, content: textList })

const link = (...protocols) => z.url().refine(
  value => protocols.includes(new URL(value).protocol),
  'Unsupported link protocol'
)

const items = schema => z.array(schema).max(250).refine(
  entries => new Set(entries.map(entry => entry.id)).size === entries.length,
  'IDs must be unique'
)

export const contentSchema = z.strictObject({
  name: title,
  nav: z.object({ main: z.literal('/'), work: z.literal('/work'), contacts: z.literal('/contacts') }),
  navLabels: z.object({ main: title, work: title, contacts: title }).optional(),
  position: text,
  about: textList,
  skills: items(item.extend({ body: textList })),
  education: textList,
  self_education: textList,
  sport: textList,
  experience: items(item.extend({
    body: text.optional(),
    results: workDetails.optional(),
    response: workDetails.optional(),
    technologies: workDetails.optional()
  })),
  portfolio: items(item.extend({
    link: link('https:', 'http:'),
    category: z.enum(['project', 'game']).optional(),
    role: text.optional(),
    description: text.optional(),
    technologies: textList
  })),
  contacts: items(item.extend({ link: link('https:', 'http:', 'mailto:', 'tel:') }))
})

const snapshot = data => {
  const json = JSON.stringify(data)
  const revision = createHash('sha256').update(json).digest('hex')
  return { json, etag: `"${revision}"` }
}

export async function openContentStore(file, seed) {
  let raw
  try {
    raw = await readFile(file, 'utf8')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    raw = await readFile(seed, 'utf8')
  }

  let current = snapshot(contentSchema.parse(JSON.parse(raw)))
  let pending = Promise.resolve()

  return {
    read: () => current,
    replace(data, ifMatch) {
      const save = pending.then(async () => {
        if (current.etag !== ifMatch) return null

        const next = snapshot(data)
        const temporary = `${file}.tmp`
        await mkdir(dirname(file), { recursive: true })
        await writeFile(temporary, `${next.json}\n`, { mode: 0o600 })
        await rename(temporary, file)
        current = next
        return current
      })
      pending = save.catch(() => {})
      return save
    }
  }
}
