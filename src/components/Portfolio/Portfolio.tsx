import React from 'react';
import MOCK from '../../mockData.json';
import style from './Portfolio.module.scss';
import { Link } from 'react-router-dom';

type Props = {}

export const Portfolio: React.FC<Props> = () => {
  const portfolioText: Project[] = MOCK.portfolio;

  return (
    <div className={style.portfolio}>
      <ul className={style.portfolio__list}>
        {portfolioText.map(project => (
          <li key={project.id} className={style.portfolio__item}>
            <p className={style.project__title}>
              {project.title}
            </p>

            <Link
              to={project.link}
              className={style.project__link}
              rel='noreferrer'
              target='_blank'
              title={project.title}
            >
              link
            </Link>

            <div className={style.technologies}>
              Technologies:

              <ul className={style.technologies__list}>
                {project.technologies.map((technology, i) => (
                  <li key={i} className={style.technologies__item}>
                    {technology}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
