import React, { useState } from "react";
import classNames from 'classnames';
import photo from '../../images/myself/intro-320.jpg';
import { Skills } from "../Skills";
import { Education } from "../Education";
import { Experience } from "../Experience";
import { Sport } from "../Sport";

export const Introduce = () => {
  const buttons = ['skills', 'education', 'experience', 'sport'];
  const [component, setComponent] = useState(<Skills />);
  const [button, setButton] = useState<string>('skills');

  const handleClick = (e: any) => {
    switch (e.target.value) {
      case 'skills':
        setComponent(<Skills />);
        setButton('skills');
        break;

      case 'education':
        setComponent(<Education />);
        setButton('education');
        break;

      case 'experience':
        setComponent(<Experience />);
        setButton('experience');
        break;

      case 'sport':
        setComponent(<Sport />);
        setButton('sport');
        break;

      default:
        setComponent(<Skills />);
        setButton('skills');
    }
  };

  return (
    <div className="introduce">
      <div className="container">
        <div className="introduce__intro intro">
          <img src={photo} alt="" className="intro__photo"/>

          <p className="intro__text">
            Graduated from the Kyiv National Economic University and received a diploma in enterprise strategy and consulting. Had taken part in the student exchange program and studied in the UK.
          </p>

          <p className="intro__text">
            I have a lot of experience in different industries. Auto services, sales, operational management, agricultural sector, private enterprise. All this experience has helped me achieve many cool projects with good results. I'm sure it will help me find a common language within a team and find solutions in difficult situations. I also know how to look at the business as a whole, so that it gives me the opportunity to offer complex solutions.
          </p>

          <p className="intro__text">
            I have over 500 hours of coding and my main stack consists of React, JavaScript, HTML and CSS. And I'm also open to learning Vue, React Native, Angular and any other technology.
          </p>
        </div>

        <div className="introduce__bar bar">
          {buttons.map((btn, i) => (
            <button
              key={i}
              type="button"
              name={btn}
              value={btn}
              className={classNames("bar__button", {"bar__button--active": button === btn})}
              onClick={e => {
                handleClick(e)
              }}
            >
              {btn}
            </button>
          ))}
        </div>

        <div className="introduce__component">
          {component}
        </div>
      </div>
    </div>
  );
};
