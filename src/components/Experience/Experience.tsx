import React from "react";
import MOCK from '../../mockData.json';
import style from './Experience.module.scss';

type Props = {}

export const Experience: React.FC<Props> = () => {
  const experienceText: Work[] = MOCK.experience;

  return (
    <div className={style.experience}>
      <ul className={style.experience__list}>
        {experienceText.map(work => (
          <li key={work.id} className={style.experience__item}>
            <p className={style.experience__title}>
              {work.title}
            </p>
            
            <p className={style.experience__body}>
              {work.body || ''}
            </p>
            
            {/* results */}
            {work.results && (
              <div className={style.content}>
                <p className={style.content__title}>
                  {work.results.title}
                </p>

                <ul className={style.content__list}>
                  {work.results.content.map((text, i) => (
                    <li key={i} className={style.content__item}>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* response */}
            {work.response && (
              <div className={style.content}>
                <p className={style.content__title}>
                  {work.response.title}
                </p>

                <ul className={style.content__list}>
                  {work.response.content.map((text, i) => (
                    <li key={i} className={style.content__item}>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
