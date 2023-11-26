import React, { useContext } from 'react';
import classNames from 'classnames';

import { Context } from '../../context/season';
import { getCurrentClassNames } from '../../styles/functions';
import style from './Footer.module.scss';

type Props = {};

export const Footer: React.FC<Props> = () => {
  const season = useContext(Context);

  return (
    <footer
      className={classNames(getCurrentClassNames(style, 'footer', season))}
    >
      <span className={style.text}>Created by Uliton&copy;</span>
    </footer>
  );
};
