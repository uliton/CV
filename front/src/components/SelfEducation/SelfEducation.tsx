import React, { useContext } from "react";

import { MockContext } from "../../context/mock";

import style from './SelfEducation.module.scss';

type Props = {}

export const SelfEducation: React.FC<Props> = () => {
  const mock = useContext(MockContext)
  const selfEducationText: string[] = mock.data.self_education

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
