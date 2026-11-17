import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MockContext } from '../../context/mock';
import { getPortfolioSections } from '../../functions/portfolio';

import style from './Portfolio.module.scss';

export const Portfolio = () => {
  const mock = useContext(MockContext)
  const sections = getPortfolioSections([...mock.data.portfolio].reverse())

  return (
    <div className={style.portfolio}>
      {sections.map(({ title, items }) => (
        <section className={style.portfolio__section} key={title}>
          {(sections.length > 1 || title === 'Games') && (
            <h2 className={style.portfolio__heading}>{title}</h2>
          )}
          <ul className={style.portfolio__list}>
            {items.map(project => (
              <li key={project.id} className={style.portfolio__item}>
                <p className={style.project__title}>
                  {project.title}
                </p>

                {project.role && <p className={style.project__role}>{project.role}</p>}

                {project.description && (
                  <p className={style.project__description}>{project.description}</p>
                )}

                <Link
                  to={project.link}
                  className={style.project__link}
                  rel='noreferrer'
                  target='_blank'
                  aria-label={project.category === 'game' ? `Play ${project.title}` : `Open ${project.title}`}
                >
                  {project.category === 'game' ? 'Play' : 'Link'}
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
        </section>
      ))}
    </div>
  );
};
