import { Education } from '../components/Education'
import { Experience } from '../components/Experience'
import { Skills } from '../components/Skills'

import { Introduce } from '../components/Introduce'
import { Portfolio } from '../components/Portfolio'

export enum MainComponents {
	introduce = 'introduce',
	education = 'education',
	skills = 'skills',
}

export enum WorkComponents {
	portfolio = 'portfolio',
	experience = 'experience',
}

export const getCurrentComponent = (component: string) => {
	switch (component) {
		case MainComponents.introduce:
			return <Introduce />

		case MainComponents.education:
			return <Education />

		case MainComponents.skills:
			return <Skills />

		case WorkComponents.experience:
			return <Experience />

		case WorkComponents.portfolio:
			return <Portfolio />

		default:
			;<></>
	}
}
