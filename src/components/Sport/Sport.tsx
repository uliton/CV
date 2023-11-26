import React from "react";
import MOCK from '../../mockData.json';
import style from './Sport.module.scss';

type Props = {}

export const Sport: React.FC<Props> = () => {
  const sportText: string[] = MOCK.sport;

  return (
    <div className={style.sport}>
      <ul className={style.list}>
        {sportText.map((text, i) => (
          <li key={i} className={style.item}>
            <p className={style.text}>
              {text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
