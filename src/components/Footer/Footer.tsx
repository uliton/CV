import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { Context } from '../../context/season';

import { Season } from '../../styles/styles';
import style from './Footer.module.scss';

type Props = {}

export const Footer: React.FC<Props> = () => {
  const season = useContext(Context);
  const currentStyles = useCallback((className: string) => ({
    [style[className]]: true,
    [style[`${className}--winter`]]: season === Season.winter,
    [style[`${className}--spring`]]: season === Season.winter,
    [style[`${className}--summer`]]: season === Season.winter,
    [style[`${className}--autumn`]]: season === Season.winter,
    }), [season]);
    
  return (
    <footer className={classNames(currentStyles('footer'))}>
      <span className={style.text}>
        Created by Uliton&copy;
      </span>
  </footer>
  );
};
