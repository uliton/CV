import React, { useContext } from 'react';

import { MockContext } from '../../context/mock';
import { SelfEducation } from '../SelfEducation';

import style from './Education.module.scss';

type Props = {}

export const Education: React.FC<Props> = () => {
  const mock = useContext(MockContext)
  const educationText: string[] = mock.data.education;

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
