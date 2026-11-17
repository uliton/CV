import { useContext, useState } from 'react'
import type { FormEvent } from 'react'
import classNames from 'classnames'

import { SeasonContext } from '../../context/season'
import { getCurrentClassNames } from '../../styles/functions'
import { ApiError } from '../../api'
import style from './AdminLogin.module.scss'

type Props = {
  onSignIn: (username: string, password: string) => Promise<void>
  checkingSession: boolean
}

export const AdminLogin = ({ onSignIn, checkingSession }: Props) => {
  const season = useContext(SeasonContext)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (checkingSession || submitting) return

    const data = new FormData(event.currentTarget)
    const username = String(data.get('username') ?? '')
    const password = String(data.get('password') ?? '')

    setError('')
    setSubmitting(true)
    try {
      await onSignIn(username, password)
    } catch (error) {
      setError(error instanceof ApiError && error.status === 401
        ? 'Sign-in failed. Check your credentials and allow cookies.'
        : 'Could not reach the sign-in service. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={classNames(getCurrentClassNames(style, 'login', season))}>
      <form
        aria-label='Admin login'
        className={style.form}
        method='post'
        onChange={() => setError('')}
        onSubmit={handleSubmit}
      >
        <div className={style.field}>
          <label htmlFor='admin-username'>Username</label>
          <input
            autoComplete='username'
            autoCapitalize='none'
            id='admin-username'
            name='username'
            required
            spellCheck={false}
            type='text'
          />
        </div>

        <div className={style.field}>
          <label htmlFor='admin-password'>Password</label>
          <div className={style.password}>
            <input
              autoComplete='current-password'
              id='admin-password'
              name='password'
              required
              type={showPassword ? 'text' : 'password'}
            />
            <button
              aria-controls='admin-password'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className={style.toggle}
              onClick={() => setShowPassword(visible => !visible)}
              type='button'
            >
              <svg
                aria-hidden='true'
                fill='none'
                height='20'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.6'
                viewBox='0 0 24 24'
                width='20'
              >
                <path d='M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z' />
                <circle cx='12' cy='12' r='2.5' />
                {showPassword && <path d='m3 3 18 18' />}
              </svg>
            </button>
          </div>
        </div>

        <button className={style.submit} type='submit' disabled={checkingSession || submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className={style.status} role='status'>
        {error}
      </p>
    </main>
  )
}
