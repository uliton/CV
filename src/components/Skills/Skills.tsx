import React from 'react';
import MOCK from '../../mockData.json';
import style from './Skills.module.scss';

type Props = {}

export const Skills: React.FC<Props> = () => {
  const skillsText: Skill[] = MOCK.skills;

  return (
    <div className={style.skills}>
      <ul className={style.skills__list}>
        {skillsText.map(skill => (
          <li key={skill.id} className={style.skill__item}>
            {skill.title && (
              <div className={style.skill__title}>
                {skill.title}
              </div>
            )}

            {skill.body.map((text, i) => (
              <span key={i} className={style.skill__content}>
                {text}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};
