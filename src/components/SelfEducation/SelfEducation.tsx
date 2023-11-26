import React from "react";
import MOCK from '../../mockData.json';
import style from './SelfEducation.module.scss';

type Props = {}

export const SelfEducation: React.FC<Props> = () => {
  const selfEducationText: string[] = MOCK.self_education;

  return (
    <div className={style.selfEducation}>
      <p className={style.selfEducation__title}>
        Self Education
      </p>

      <ul className={style.selfEducation__list}>
        {selfEducationText.map((text, i) => (
          <li key={i} className={style.selfEducation__item}>
            <p className={style.selfEducation__text}>
              {text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
