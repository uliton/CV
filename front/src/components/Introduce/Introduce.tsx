import React, { useContext } from 'react'

import { MockContext } from '../../context/mock'
import { Sport } from '../Sport'

import photo_wb from './avatar_wb.jpg'
import photo_color from './avatar_color.jpg'

import style from './Introduce.module.scss'

type Props = {}

export const Introduce: React.FC<Props> = () => {
	const mock = useContext(MockContext)
	const introduceText: string[] = mock.data.about

	return (
		<div className={style.introduce}>
			<div className={style.introduce__contant}>
				<img
					src={photo_color}
					alt='avatar'
					className={style.introduce__photo}
				/>

				{introduceText.map((text, i) => (
					<p key={i} className={style.introduce__text}>
						{text}
					</p>
				))}
			</div>

			<div className={style.hobby}>
				<p className={style.hobby__title}>Hobby and sport</p>
			</div>
			<Sport />
		</div>
	)
}
