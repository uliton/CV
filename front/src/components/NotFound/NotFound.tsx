import React, { useContext } from 'react';
import classNames from 'classnames';

import { SeasonContext } from '../../context/season'
import { getCurrentClassNames } from '../../styles/functions';

import style from './NotFound.module.scss';

type Props = {};

export const NotFound: React.FC<Props> = () => {
  const season = useContext(SeasonContext)

  return (
    <div
      className={classNames(getCurrentClassNames(style, 'notFound', season))}
    >
      Page Not Found!
    </div>
  );
};
