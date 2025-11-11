import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import axios from 'axios'
import { Route, Routes } from 'react-router'
import MOCK from './mockData.json'

import { Header } from './components/Header'
import { Main } from './components/Main'
import { Work } from './components/Work'
import { Contacts } from './components/Contacts'
import { Footer } from './components/Footer'
import { NotFound } from './components/NotFound'

import { SeasonContext, getCurrentSeason } from './context/season'
import { MockContext } from './context/mock'
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

export const App: React.FC = () => {
	const [season, setSeason] = useState<Season>(Season.winter)

	const [mockData, setMockData] = useState<any>(MOCK)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const refresh = useCallback(async () => {
		setLoading(true)
		setError(null)
		try {
			// базовий локальний бекенд; за потреби заміниш на ENV
			const res = await axios.get(
				'http://95.67.70.46:6376/data?db=mock&col=cv',
				{
					headers: {
						'X-API-Key': 'test',
					},
				}
			)
			setMockData(res?.data[0] ?? MOCK)
		} catch (e: any) {
			setMockData(MOCK)
			setError(e?.message ?? 'Fetch failed')
		} finally {
			setLoading(false)
		}
	}, [])

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
		refresh()
	}, [refresh])

	return (
		<MockContext.Provider value={{ data: mockData, loading }}>
			<SeasonContext.Provider value={season}>
				<div className={classNames(getCurrentClassNames(style, 'app', season))}>

					{season === Season.winter && <Snowfall />}
					{season === Season.spring && <Rain />}
					{season === Season.summer && <Fireflies />}
					{season === Season.autumn && <Leaves />}

					<Header />

					<Routes>
						<Route path='/' element={<Main />} />
						<Route path='/work' element={<Work />} />
						<Route path='/contacts' element={<Contacts />} />
						<Route path='*' element={<NotFound />} />
					</Routes>

					{/* <div style={{ height: '24px' }}></div> */}

					<Footer />
				</div>
			</SeasonContext.Provider>
		</MockContext.Provider>
	)
}
