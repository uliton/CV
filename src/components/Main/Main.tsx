import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Context } from '../../context/season';
import { Season, getCurrentClassNames } from '../../styles/styles';
import style from './Main.module.scss';
import { Link } from 'react-router-dom';

type Props = {}

export const Main: React.FC<Props> = () => {
  const season = useContext(Context);

  return (
    <main className={classNames(getCurrentClassNames(style, 'main', season))}>
      <div className="container">
        <div className={style.content}>
          <p className={style.text}>
            Unfortunately the page is not ready yet.
          </p>
          <p className={style.text}>
            You can
            {' '}
            <a
              href="./files/CV.pdf"
              target="_blank"
              rel="noreferrer"
              className={classNames(getCurrentClassNames(style, 'link', season))}
            >
              OPEN
            </a>
            {' '}
            ore
            {' '}
            <a
              href="./files/CV.pdf"
              className={classNames(getCurrentClassNames(style, 'link', season))}
              download
            >
              DOWNLOAD
            </a>
            {' '}
            my CV
          </p>
          <p className={style.text}>
            Other info coming soon.
          </p>
          <p className={style.text}>
            P.S. Introduce was added
          </p>
        </div>
      </div>
    </main>
  );
};
