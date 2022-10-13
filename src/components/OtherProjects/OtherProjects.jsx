import React, { useState } from 'react';
import projects from '../../repositories.json';
import './OtherProjects.scss';

export const OtherProjects = () => {
  const categories = ['all'];

  for (const project of projects) {
    if (!categories.includes(project.chapter)) {
      categories.push(project.chapter);
    }
  }

  const [renderProjects, setRenderProjects] = useState([]);

  const handleChooseCategory = (category) => {
    if (category === 'all') {
      return setRenderProjects([...projects]);
    }

    return setRenderProjects(
      [...projects].filter(project => project.chapter === category),
    );
  };

  return (
    <>
      <div className="body">
        <div>
          <span>
            Category -
          </span>
          {' '}
          <select
            onChange={(event) => {
              handleChooseCategory(event.target.value);
            }}
          >
            <option
              value={0}
              disabled
              selected
            >
              choose a categor
            </option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>

          <a
            href="https://drive.google.com/file/d/1nhXyA3fb5lFC2n9Lp2V-JJ6HqtvXMs1Y/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            My CV
          </a>
        </div>

        {renderProjects.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>DEMO</th>
                <th>Repository</th>
              </tr>
            </thead>
            <tbody>
              {renderProjects.map(project => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </td>
                  <td>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
