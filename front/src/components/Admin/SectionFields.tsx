import type { ReactNode } from 'react'
import type { Section } from './ContentTabs'
import style from './Admin.module.scss'

type Props = {
  section: Exclude<Section, 'portfolio'>
  content: Mock
  onChange: (changes: Partial<Mock>) => void
}

type TextProps = {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  multiline?: boolean
  type?: 'text' | 'url'
}

function TextField({ label, value, onChange, required, multiline, type = 'text' }: TextProps) {
  return (
    <label>
      {label}
      {multiline
        ? <textarea rows={4} value={value} onChange={event => onChange(event.target.value)} />
        : <input type={type} required={required} value={value} onChange={event => onChange(event.target.value)} />
      }
    </label>
  )
}

function LinesField({ label, value, onChange }: {
  label: string
  value: string[]
  onChange: (value: string[]) => void
}) {
  return (
    <label>
      {label} (one per line)
      <textarea rows={Math.min(10, Math.max(3, value.length + 1))} value={value.join('\n')}
        onChange={event => onChange(event.target.value ? event.target.value.split('\n') : [])} />
    </label>
  )
}

function Entries<T extends { id: number; title: string }>({ entries, label, create, onChange, children }: {
  entries: T[]
  label: string
  create: (id: number) => T
  onChange: (entries: T[]) => void
  children: (entry: T, update: (changes: Partial<T>) => void) => ReactNode
}) {
  return (
    <>
      {entries.map((entry, index) => {
        const update = (changes: Partial<T>) => {
          onChange(entries.map(item => item.id === entry.id ? { ...item, ...changes } : item))
        }

        return (
          <fieldset className={style.entry} key={entry.id}>
            <legend>{label} {index + 1}</legend>
            {children(entry, update)}
            <div className={style.actions}>
              <button className={`${style.action} ${style.delete}`} type='button'
                aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}
                onClick={() => onChange(entries.filter(item => item.id !== entry.id))}>Remove</button>
            </div>
          </fieldset>
        )
      })}
      <div className={style.actions}>
        <button className={style.action} type='button' onClick={() => {
          const id = Math.max(0, ...entries.map(entry => entry.id)) + 1
          onChange([...entries, create(id)])
        }}>Add {label.toLowerCase()}</button>
      </div>
    </>
  )
}

const workGroups = { results: 'Results', response: 'Responsibilities', technologies: 'Technologies' } as const
const navKeys = ['main', 'work', 'contacts'] as const
const navDefaults = { main: 'Main', work: 'Work', contacts: 'Contacts' }

export const SectionFields = ({ section, content, onChange }: Props) => {
  switch (section) {
    case 'profile':
      return (
        <>
          <TextField label='Name' value={content.name} required onChange={name => onChange({ name })} />
          <TextField label='Position' value={content.position} onChange={position => onChange({ position })} />
          <LinesField label='About' value={content.about} onChange={about => onChange({ about })} />
        </>
      )
    case 'education':
    case 'self_education':
    case 'sport':
      return <LinesField label='Entries' value={content[section]} onChange={value => onChange({ [section]: value })} />
    case 'skills':
      return (
        <Entries entries={content.skills} label='Skill group' create={id => ({ id, title: '', body: [] })}
          onChange={skills => onChange({ skills })}>
          {(skill, update) => (
            <>
              <TextField label='Title' value={skill.title} required onChange={title => update({ title })} />
              <LinesField label='Skills' value={skill.body} onChange={body => update({ body })} />
            </>
          )}
        </Entries>
      )
    case 'experience':
      return (
        <Entries<Work> entries={content.experience} label='Experience entry' create={id => ({ id, title: '' })}
          onChange={experience => onChange({ experience })}>
          {(work, update) => (
            <>
              <TextField label='Title' value={work.title} required onChange={title => update({ title })} />
              <TextField label='Description' value={work.body ?? ''} multiline
                onChange={body => update({ body: body || undefined })} />
              {(Object.keys(workGroups) as (keyof typeof workGroups)[]).map(key => {
                const group = work[key] ?? { title: '', content: [] }
                const label = workGroups[key]
                const updateGroup = (next: WorkRes) => {
                  update({ [key]: next.title || next.content.length ? next : undefined })
                }

                return (
                  <details key={key} className={style.details}>
                    <summary>{label}</summary>
                    <TextField label={`${label} heading`} value={group.title}
                      onChange={title => updateGroup({ ...group, title })} />
                    <LinesField label={`${label} items`} value={group.content}
                      onChange={content => updateGroup({ ...group, content })} />
                  </details>
                )
              })}
            </>
          )}
        </Entries>
      )
    case 'contacts':
      return (
        <Entries entries={content.contacts} label='Contact' create={id => ({ id, title: '', link: '' })}
          onChange={contacts => onChange({ contacts })}>
          {(contact, update) => (
            <>
              <TextField label='Label' value={contact.title} required onChange={title => update({ title })} />
              <TextField label='Link' value={contact.link} type='url' required onChange={link => update({ link })} />
            </>
          )}
        </Entries>
      )
    case 'navigation': {
      const navLabels = content.navLabels ?? navDefaults
      return (
        <>
          {navKeys.map(key => (
            <TextField key={key} label={`${navDefaults[key]} link label`} value={navLabels[key]} required
              onChange={label => onChange({ navLabels: { ...navLabels, [key]: label } })} />
          ))}
        </>
      )
    }
  }
}
