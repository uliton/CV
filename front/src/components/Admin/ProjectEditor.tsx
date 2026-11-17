import { useState } from 'react'
import type { FormEvent } from 'react'
import { getPortfolioSections } from '../../functions/portfolio'
import style from './Admin.module.scss'

type Props = {
  projects: Project[]
  onSave: (projects: Project[]) => Promise<void>
}

const emptyDraft = {
  title: '', role: '', link: '', description: '', technologies: '',
  category: 'project' as NonNullable<Project['category']>,
}

export const ProjectEditor = ({ projects, onSave }: Props) => {
  const [editing, setEditing] = useState<Project['id'] | 'new' | null>(null)
  const [removing, setRemoving] = useState<Project | null>(null)
  const [draft, setDraft] = useState(emptyDraft)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [order, setOrder] = useState<Project[] | null>(null)
  const visibleProjects = order ?? [...projects].reverse()
  const canReorder = !saving && editing === null && removing === null

  const edit = (project?: Project) => {
    setNotice('')
    setRemoving(null)
    setEditing(project?.id ?? 'new')
    setDraft(project
      ? {
        title: project.title,
        category: project.category ?? 'project',
        role: project.role ?? '',
        link: project.link,
        description: project.description ?? '',
        technologies: project.technologies.join('\n'),
      }
      : emptyDraft)
  }

  const save = async (next: Project[], message: string) => {
    setSaving(true)
    setNotice('')
    try {
      await onSave(next)
      setEditing(null)
      setRemoving(null)
      setOrder(null)
      setNotice(message)
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Could not save the portfolio.')
    } finally {
      setSaving(false)
    }
  }

  const move = (project: Project, target: Project | undefined, position: number) => {
    if (!canReorder || !target) return

    const from = visibleProjects.indexOf(project)
    const to = visibleProjects.indexOf(target)
    const next = [...visibleProjects]
    next[from] = target
    next[to] = project
    setOrder(next)
    setNotice(`${project.title} moved to position ${position}.`)
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (saving || editing === null) return

    const creating = editing === 'new'
    const project: Project = {
      id: creating ? Math.max(0, ...projects.map(entry => entry.id)) + 1 : editing,
      title: draft.title.trim(),
      category: draft.category === 'game' ? 'game' : undefined,
      role: draft.role.trim() || undefined,
      link: draft.link.trim(),
      description: draft.description.trim() || undefined,
      technologies: draft.technologies.split('\n').map(technology => technology.trim()).filter(Boolean),
    }
    const next = creating ? [...projects, project] : projects.map(entry => entry.id === editing ? project : entry)
    void save(next, creating ? 'Project added.' : 'Project updated.')
  }

  return (
    <>
      <div className={`${style.actions} ${style.projectToolbar}`}>
        <button className={style.primary} type='button' onClick={() => edit()} disabled={saving || order !== null}>
          Add project
        </button>
        {order && (
          <>
            <button className={style.primary} type='button' disabled={saving}
              onClick={() => save([...order].reverse(), 'Project order saved.')}>
              Save order
            </button>
            <button className={style.action} type='button' disabled={saving}
              onClick={() => { setOrder(null); setNotice('') }}>
              Cancel reorder
            </button>
          </>
        )}
      </div>

      {editing !== null && (
        <form className={style.editor} onSubmit={submit}>
          <h3>{editing === 'new' ? 'New project' : 'Edit project'}</h3>
          <label>
            Title
            <input required autoFocus value={draft.title}
              onChange={event => setDraft({ ...draft, title: event.target.value })} />
          </label>
          <label>
            Category
            <select value={draft.category}
              onChange={event => setDraft({ ...draft, category: event.target.value === 'game' ? 'game' : 'project' })}>
              <option value='project'>Projects</option>
              <option value='game'>Games</option>
            </select>
          </label>
          <label>
            Role
            <input value={draft.role} onChange={event => setDraft({ ...draft, role: event.target.value })} />
          </label>
          <label>
            Project URL
            <input type='url' required value={draft.link}
              onChange={event => setDraft({ ...draft, link: event.target.value })} />
          </label>
          <label>
            Description
            <textarea rows={4} value={draft.description}
              onChange={event => setDraft({ ...draft, description: event.target.value })} />
          </label>
          <label>
            Technologies (one per line)
            <textarea rows={3} value={draft.technologies}
              onChange={event => setDraft({ ...draft, technologies: event.target.value })} />
          </label>
          <div className={style.actions}>
            <button className={style.primary} type='submit' disabled={saving}>Save</button>
            <button className={style.action} type='button' onClick={() => setEditing(null)} disabled={saving}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {removing && (
        <div className={style.editor}>
          <p>Delete “{removing.title}”?</p>
          <div className={style.actions}>
            <button className={style.primary} type='button' disabled={saving}
              onClick={() => save(projects.filter(project => project.id !== removing.id), 'Project deleted.')}>
              Confirm deletion
            </button>
            <button className={style.action} type='button' onClick={() => setRemoving(null)} disabled={saving} autoFocus>
              Cancel
            </button>
          </div>
        </div>
      )}

      <p className={style.notice} role='status'>{saving ? 'Saving…' : notice}</p>
      {getPortfolioSections(visibleProjects).map(({ title, items }) => (
        <section key={title} className={style.projectSection}>
          <h3>{title}</h3>
          <ul className={style.projects}>
            {items.map((project, index) => (
              <li key={project.id} className={style.project}>
                <div className={style.projectIdentity}>
                  <p>{project.title}</p>
                  {project.role && <p className={style.projectRole}>{project.role}</p>}
                </div>
                <div className={style.actions}>
                  <button className={`${style.action} ${style.move}`} type='button'
                    aria-label={`Move ${project.title} up`}
                    onClick={() => move(project, items[index - 1], index)} disabled={!canReorder || index === 0}>↑</button>
                  <button className={`${style.action} ${style.move}`} type='button'
                    aria-label={`Move ${project.title} down`}
                    onClick={() => move(project, items[index + 1], index + 2)} disabled={!canReorder || index === items.length - 1}>↓</button>
                  <button className={style.action} type='button' aria-label={`Edit ${project.title}`}
                    onClick={() => edit(project)} disabled={saving || order !== null}>Edit</button>
                  <button className={`${style.action} ${style.delete}`} type='button' aria-label={`Delete ${project.title}`}
                    onClick={() => { setEditing(null); setRemoving(project); setNotice('') }} disabled={saving || order !== null}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}
