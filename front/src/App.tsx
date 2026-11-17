import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Navigate, Outlet, Route, Routes, useMatch } from 'react-router'
import { ApiError, getContent, getSession, logIn, logOut, updateContent } from './api'

import { Header } from './components/Header'
import { Main } from './components/Main'
import { Work } from './components/Work'
import { Contacts } from './components/Contacts'
import { Footer } from './components/Footer'
import { NotFound } from './components/NotFound'
import { AdminLogin } from './components/AdminLogin/AdminLogin'
import { Admin } from './components/Admin/Admin'

import { SeasonContext, getCurrentSeason } from './context/season'
import { initialContent, MockContext } from './context/mock'
import {
	Season,
	getCurrentClassNames,
	// setMetaThemeColor,
} from './styles/functions'
import style from './App.module.scss'
import Leaves from './components/Leaves/Leaves'
import Snowfall from './components/Snow/Snow'
import { Rain } from './components/Rain/Rain'
import { Fireflies } from './components/Fireflies/Fireflies'

const staticBuild = process.env.REACT_APP_CV_STATIC === 'true'

export const App: React.FC = () => {
	const [season, setSeason] = useState<Season>(Season.winter)
	const isAdminRoute = Boolean(useMatch('/admin/*'))
	const [isAdminSignedIn, setIsAdminSignedIn] = useState<boolean | null>(null)
	const [content, setContent] = useState<{ data: Mock; revision: string } | null>(null)
	const [loading, setLoading] = useState(!staticBuild)

	const signIn = async (username: string, password: string) => {
		await logIn(username, password)
		await getSession()
		setIsAdminSignedIn(true)
	}

	const signOut = async () => {
		await logOut()
		setIsAdminSignedIn(false)
	}

	const saveContent = async (changes: Partial<Mock>) => {
		if (!content) throw new Error('Reload the page to load the current content.')

		try {
			setContent(await updateContent({ ...content.data, ...changes }, content.revision))
		} catch (error) {
			if (error instanceof ApiError && error.status === 401) setIsAdminSignedIn(false)
			throw error
		}
	}

	useEffect(() => {
		getCurrentSeason(setSeason)

		const root = document.documentElement // <html>
		root.classList.remove(
			'season--winter',
			'season--spring',
			'season--summer',
			'season--autumn'
		)
		root.classList.add(`season--${Season[season]}`)
	}, [season])

	useEffect(() => {
		if (staticBuild) return
		let active = true
		getContent()
			.then(result => { if (active) setContent(result) })
			.catch(() => {})
			.finally(() => { if (active) setLoading(false) })
		return () => { active = false }
	}, [])

	useEffect(() => {
		if (staticBuild || !isAdminRoute) return
		let active = true
		getSession()
			.then(() => { if (active) setIsAdminSignedIn(true) })
			.catch(() => { if (active) setIsAdminSignedIn(false) })
		return () => { active = false }
	}, [isAdminRoute])

	return (
		<MockContext.Provider value={{ data: content?.data ?? initialContent, loading }}>
			<SeasonContext.Provider value={season}>
				<div className={classNames(getCurrentClassNames(style, 'app', season))}>

					{season === Season.winter && <Snowfall />}
					{season === Season.spring && <Rain />}
					{season === Season.summer && <Fireflies />}
					{season === Season.autumn && <Leaves />}

					<Routes>
						<Route element={<><Header /><Outlet /></>}>
							<Route path='/' element={<Main />} />
							<Route path='/work' element={<Work />} />
							<Route path='/contacts' element={<Contacts />} />
							{!staticBuild && <Route path='/admin/login' element={
								isAdminSignedIn === true
									? <Navigate to='/admin' replace />
									: <AdminLogin onSignIn={signIn} checkingSession={isAdminSignedIn === null} />
							} />}
							<Route path='*' element={<NotFound />} />
						</Route>
						{!staticBuild && <Route path='/admin' element={
							isAdminSignedIn === false
								? <Navigate to='/admin/login' replace />
								: isAdminSignedIn && <Admin
									onSignOut={signOut}
									onSaveContent={saveContent}
									content={content?.data}
									loading={loading}
								/>
						} />}
					</Routes>

					{/* <div style={{ height: '24px' }}></div> */}

					<Footer showAdminLink={!staticBuild} />
				</div>
			</SeasonContext.Provider>
		</MockContext.Provider>
	)
}
