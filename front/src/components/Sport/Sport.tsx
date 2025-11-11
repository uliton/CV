import React, { useContext } from 'react';

import { MockContext } from '../../context/mock';

import style from './Sport.module.scss';

type Props = {}

export const Sport: React.FC<Props> = () => {
  const mock = useContext(MockContext)
  const sportText: string[] = mock.data.sport

  return (
    <div className={style.sport}>
      <ul className={style.sport__list}>
        {sportText.map((text, i) => (
          <li key={i} className={style.sport__item}>
            <p className={style.sport__text}>
              {text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
