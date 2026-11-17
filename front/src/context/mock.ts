import { createContext } from 'react'
import localMOCK from '../mockData.json'

export const initialContent: Mock = {
	...localMOCK,
	portfolio: localMOCK.portfolio.map(({ category, ...project }) => ({
		...project,
		category: category === 'game' || category === 'project' ? category : undefined,
	})),
}

export interface AppMock {
	data: Mock
	loading: boolean
}

export const MockContext = createContext<AppMock>({
	data: initialContent,
	loading: false,
})
