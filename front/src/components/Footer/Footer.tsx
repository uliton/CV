import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { SeasonContext } from '../../context/season'
import { getCurrentClassNames } from '../../styles/functions';
import style from './Footer.module.scss';

type Props = { showAdminLink: boolean };

export const Footer: React.FC<Props> = ({ showAdminLink }) => {
  const season = useContext(SeasonContext)

  return (
    <footer
      className={classNames(getCurrentClassNames(style, 'footer', season))}
    >
      <span className={style.text}>
        Created by {showAdminLink ? <Link className={style.link} to='/admin/login'>Uliton</Link> : 'Uliton'}&copy;
      </span>
    </footer>
  );
};
