import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { MockContext } from '../../context/mock'
import { SeasonContext } from '../../context/season'

import { getContactIcon } from '../../functions/icons'
import { getCurrentClassNames } from '../../styles/functions'
import style from './Contacts.module.scss'

type Props = {}

export const Contacts: React.FC<Props> = () => {
	const mock = useContext(MockContext)
	const season = useContext(SeasonContext)
	const contacts: Contact[] = mock.data.contacts

	return (
		<div
			className={classNames(getCurrentClassNames(style, 'contacts', season))}
		>
			<div className='container'>
				<div className={style.content}>
					<p className={style.title}>
						Need a developer or have a project in mind? Feel free to get in touch.
					</p>

					<ul className={style.list}>
						{contacts.map(contact => (
							<li key={contact.id}>
								<Link
									to={contact.link}
									className={style['icon-link']}
									title={contact.title}
									target='_blank'
									rel='noreferrer'
								>
									{getContactIcon(contact.title, style)}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
