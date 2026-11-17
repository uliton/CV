import { useContext, useState } from 'react'
import classNames from 'classnames'

import { SeasonContext } from '../../context/season'
import { getCurrentClassNames } from '../../styles/functions'
import headerStyle from '../Header/Header.module.scss'
import style from './Admin.module.scss'
import { ContentTabs } from './ContentTabs'

type Props = {
  onSignOut: () => Promise<void>
  onSaveContent: (changes: Partial<Mock>) => Promise<void>
  content: Mock | undefined
  loading: boolean
}

export const Admin = ({ onSignOut, onSaveContent, content, loading }: Props) => {
  const season = useContext(SeasonContext)
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState('')

  const handleSignOut = async () => {
    setSigningOut(true)
    setError('')
    try {
      await onSignOut()
    } catch {
      setError('Could not sign out. Try again.')
      setSigningOut(false)
    }
  }

  return (
    <>
      <header className={classNames(getCurrentClassNames(headerStyle, 'header', season))}>
        <div className={style.headerContent}>
          <h1 className={style.title}>Admin</h1>
          <button className={style.primary} type='button' onClick={handleSignOut} disabled={signingOut}>
            Sign out
          </button>
        </div>
      </header>

      <main className={classNames('container', getCurrentClassNames(style, 'panel', season))}>
        {error && <p role='alert'>{error}</p>}
        {content
          ? <ContentTabs content={content} onSave={onSaveContent} />
          : <p role='status'>
            {loading ? 'Loading CV…' : 'Could not load the CV. Reload the page to try again.'}
          </p>
        }
      </main>
    </>
  )
}
