import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { MockContext } from '../../context/mock';
import { SeasonContext } from '../../context/season'
import { getCurrentClassNames } from '../../styles/functions';

import style from './Header.module.scss';

export const Header: React.FC = () => {
  const mock = useContext(MockContext)
  const season = useContext(SeasonContext)
  const links: Nav = mock.data.nav

  return (
		<header
			className={classNames(getCurrentClassNames(style, 'header', season))}
		>
			<div className='container'>
				<Link
					to='/'
					className={classNames(getCurrentClassNames(style, 'link', season))}
				>
					<h1 className={style.title}>{mock.data.name}</h1>
				</Link>

				<nav className={style.nav}>
					<ul className={style.list}>
						{Object.entries(links).map(([name, path], i) => (
							<li key={i} className={style.item}>
								<Link
									to={path}
									className={classNames(
										getCurrentClassNames(style, 'link', season)
									)}
								>
								{mock.data.navLabels?.[name as keyof Nav] ?? name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
};
