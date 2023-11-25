import React from "react";

export const Skills: React.FC = () => {
  return (
    <div className="skills">
      <ul className="skills__list">
        <li className="skills__item item">
          <span className="item__title">Front End languages</span>
          <span className="item__content">JavaScript, TypeScript</span>
        </li>
        <li className="skills__item item">
          <span className="item__title">Libraries</span>
          <span className="item__content">React</span>
        </li>
        <li className="skills__item item">
          <span className="item__title">Technologies</span>
          <span className="item__content">Redux, Sass(SCSS), CSS3, HTML5, Git, REST API</span>
        </li>
        <li className="skills__item item">
          <span className="item__title">Frameworks</span>
          <span className="item__content">Bulma, Bootstrap, Material Ui</span>
        </li>
        <li className="skills__item item">
          <span className="item__title">Task and Project Management</span>
          <span className="item__content">Trello, Slack</span>
        </li>
        <li className="skills__item item">
          <span className="item__title">Tools</span>
          <span className="item__content">Photoshop, Figma, NPM, Eslint</span>
        </li>
        <li className="skills__item item">
          <span className="item__title">Methodologies</span>
          <span className="item__content">BEM</span>
        </li>
        <li className="skills__item item">
          <span className="item__title">Operating systems</span>
          <span className="item__content">MacOs</span>
        </li>
        <li className="skills__item item">
          <span className="item__content--exception">Basic OOP understanding</span>
        </li>
      </ul>
    </div>
  );
};
