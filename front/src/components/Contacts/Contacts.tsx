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
	const fileUrl = '/files/CV.pdf'
	const contacts: Contact[] = mock.data.contacts

	return (
		<div
			className={classNames(getCurrentClassNames(style, 'contacts', season))}
		>
			<div className='container'>
				<div className={style.content}>
					<p className={style.title}>
						You also can{' '}
						<a
							href={process.env.PUBLIC_URL + fileUrl}
							target='_blank'
							rel='noreferrer'
							className={classNames(
								getCurrentClassNames(style, 'link', season)
							)}
						>
							OPEN
						</a>{' '}
						ore{' '}
						<a
							href={process.env.PUBLIC_URL + fileUrl}
							className={classNames(
								getCurrentClassNames(style, 'link', season)
							)}
							download
						>
							DOWNLOAD
						</a>{' '}
						my CV
						<br />
						And always can easily connect with me!
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
