import { useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { ProjectEditor } from './ProjectEditor'
import { SectionFields } from './SectionFields'
import style from './Admin.module.scss'

const sections = {
  profile: 'Profile',
  education: 'Education',
  self_education: 'Self-education',
  skills: 'Skills',
  sport: 'Hobbies & Sport',
  experience: 'Experience',
  portfolio: 'Portfolio',
  contacts: 'Contacts',
  navigation: 'Navigation',
}

export type Section = keyof typeof sections
const sectionKeys = Object.keys(sections) as Section[]

type Props = {
  content: Mock
  onSave: (changes: Partial<Mock>) => Promise<void>
}

export const ContentTabs = ({ content, onSave }: Props) => {
  const [section, setSection] = useState<Section>('profile')
  const [drafts, setDrafts] = useState<Partial<Record<Section, Partial<Mock>>>>({})
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const viewport = useRef<HTMLDivElement>(null)
  const tabs = useRef<Partial<Record<Section, HTMLButtonElement | null>>>({})

  const draft = drafts[section]

  const change = (next: Partial<Mock>) => {
    setDrafts(previous => ({ ...previous, [section]: { ...previous[section], ...next } }))
    setNotice('')
  }

  const select = (next: Section) => {
    setSection(next)
    setNotice('')
    if (viewport.current) viewport.current.scrollTop = 0
  }

  const moveTab = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = sectionKeys.length - 1
    let next: number
    switch (event.key) {
      case 'ArrowRight': next = index === last ? 0 : index + 1; break
      case 'ArrowLeft': next = index === 0 ? last : index - 1; break
      case 'Home': next = 0; break
      case 'End': next = last; break
      default: return
    }
    event.preventDefault()
    const key = sectionKeys[next]
    select(key)
    tabs.current[key]?.focus()
  }

  const save = async (changes: Partial<Mock>) => {
    setSaving(true)
    try {
      await onSave(changes)
    } finally {
      setSaving(false)
    }
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft || saving) return

    setNotice('')
    try {
      await save(draft)
      setDrafts(previous => ({ ...previous, [section]: undefined }))
      setNotice('Changes saved.')
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not save changes.')
    }
  }

  return (
    <>
      <div className={style.tabs} role='tablist' aria-label='CV sections'>
        {sectionKeys.map((key, index) => (
          <button key={key} id={`cv-tab-${key}`} ref={element => { tabs.current[key] = element }}
            className={style.tab} type='button' role='tab'
            aria-selected={key === section} aria-controls='cv-section'
            tabIndex={key === section ? 0 : -1}
            onClick={() => select(key)} onKeyDown={event => moveTab(event, index)} disabled={saving}>
            {sections[key]}
          </button>
        ))}
      </div>

      <div className={style.viewport} ref={viewport} id='cv-section' role='tabpanel'
        aria-labelledby={`cv-tab-${section}`}>
        <div hidden={section !== 'portfolio'}>
          <ProjectEditor projects={content.portfolio} onSave={portfolio => save({ portfolio })} />
        </div>
        {section !== 'portfolio' && (
          <form onSubmit={submit}>
            <fieldset className={style.editor} disabled={saving}>
              <legend className={style.sectionTitle}>{sections[section]}</legend>
              <SectionFields section={section} content={{ ...content, ...draft }} onChange={change} />
              <div className={style.actions}>
                <button className={style.primary} type='submit' disabled={!draft}>Save changes</button>
                {draft && (
                  <button className={style.action} type='button' onClick={() => {
                    setDrafts(previous => ({ ...previous, [section]: undefined }))
                    setNotice('')
                  }}>Discard changes</button>
                )}
              </div>
              <p className={style.notice} role='status'>{saving ? 'Saving…' : notice}</p>
            </fieldset>
          </form>
        )}
      </div>
    </>
  )
}
