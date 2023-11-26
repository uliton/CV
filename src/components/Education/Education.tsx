import React from 'react';
import MOCK from '../../mockData.json';
import { SelfEducation } from '../SelfEducation';
import style from './Education.module.scss';

type Props = {}

export const Education: React.FC<Props> = () => {
  const educationText: string[] = MOCK.education;

  return (
    <div className={style.education}>
      <ul className={style.education__list}>
        {educationText.map((text, i) => (
          <li key={i} className={style.education__item}>
            <p className={style.education__text}>
              {text}
            </p>
          </li>
        ))}
      </ul>

      <SelfEducation />
    </div>
  );
};
