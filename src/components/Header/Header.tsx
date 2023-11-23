import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from '../../context/season';
import MOCK from '../../mockData.json';

import { Season } from '../../styles/styles';
import style from './Header.module.scss';

export const Header: React.FC = () => {
  const season = useContext(Context);
  const currentStyles = useCallback((className: string) => ({
    [style[className]]: true,
    [style[`${className}--winter`]]: season === Season.winter,
    [style[`${className}--spring`]]: season === Season.winter,
    [style[`${className}--summer`]]: season === Season.winter,
    [style[`${className}--autumn`]]: season === Season.winter,
  }), [season]);
  
  const links: Link[] = MOCK.nav;
  
  return (
    <header className={classNames(currentStyles('header'))}>
      <div className='container'>
        <Link
          to='/'
          className={classNames(currentStyles('link'))}
        >
          <h1 className={style.title}>
            {MOCK.name}
          </h1>
        </Link>

        <nav className={style.nav}>
          <ul className={style.list}>
            {links.map((link, i) => (
              <li key={i} className={style.item}>
                <Link
                  to={link.link}
                  className={classNames(currentStyles('link'))}
                >
                  {link.title}
                </Link>
              </li>
            ))}

            {/* <li className={style.item}>
              <Link
                to='/portfolio'
                className={classNames(currentStyles('link'))}
              >
                portfollio
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
