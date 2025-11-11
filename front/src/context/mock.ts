import React, { createContext } from 'react'
import localMOCK from '../mockData.json'
import { Season } from '../styles/functions'

export interface AppMock {
	// season: Season
	// setSeason: (s: Season) => void
	data: Mock
	// setData: (d: AppData) => void
	loading: boolean
	// error: string | null
	// refresh: () => Promise<void>
}

export const MockContext = createContext<AppMock>({
	// season: Season.winter,
	// setSeason: () => {},
	data: localMOCK,
	// setData: () => {},
	loading: false,
	// error: null,
	// refresh: async () => {},
})

// опційно зручний хук
// export const useApp = () => React.useContext(MockContext)
