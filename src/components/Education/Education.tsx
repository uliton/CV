import React from "react";
import MOCK from '../../mockData.json';
import { SelfEducation } from "../SelfEducation";
import style from './Education.module.scss';

type Props = {}

export const Education: React.FC<Props> = () => {
  const educationText: string[] = MOCK.education;

  return (
    <div className={style.education}>
      <ul className={style.list}>
        {educationText.map((text, i) => (
          <li key={i} className={style.item}>
            <p className={style.text}>
              {text}
            </p>
          </li>
        ))}
      </ul>

      <SelfEducation />
    </div>
  );
};
