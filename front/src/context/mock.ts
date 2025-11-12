import { createContext } from 'react'
import localMOCK from '../mockData.json'

export interface AppMock {
	data: Mock
	loading: boolean
}

export const MockContext = createContext<AppMock>({
	data: localMOCK,
	loading: false,
})
