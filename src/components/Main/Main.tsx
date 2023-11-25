import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';


import { Context } from '../../context/season';
import { Season, getCurrentClassNames } from '../../styles/styles';
import style from './Main.module.scss';
import { Link } from 'react-router-dom';
import { Skills } from '../Skills';
import { Sport } from '../Sport';
import { Education } from '../Education';
import { Experience } from '../Experience';
import { Introduce } from '../Introduce';


enum Categories {
  introduce = "introduce",
  education = "education",
  // self_education = "self education",
  // skills = "skills",
  // experience = "experience",
  sport = "sport",
}

type Props = {}

export const Main: React.FC<Props> = () => {
  const season = useContext(Context);
  const [isReady] = useState<boolean>(true);


  const buttons = Object.values(Categories);
  const [component, setComponent] = useState(<Introduce />);
  const [button, setButton] = useState<string>(Categories.introduce);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | any) => {
    switch (event.target.value) {
      case Categories.education:
        setComponent(<Education />);
        setButton(Categories.education);
        break;

      case Categories.sport:
        setComponent(<Sport />);
        setButton(Categories.sport);
        break;

      default:
        setComponent(<Introduce />);
        setButton(Categories.introduce);
    }
  };

  return (
    <main className={classNames('container', getCurrentClassNames(style, 'main', season))}>

        {isReady

          // for develop
          ? (
            <>
              <div className={style['button-bar']}>
                {buttons.map((btn, i) => (
                  <button
                    key={i}
                    type="button"
                    name={btn}
                    value={btn}
                    className={classNames({
                      [style.button]: true,
                      [style['button--active']]: button === btn
                    })}
                    onClick={handleClick}
                  >
                    {btn}
                  </button>
                ))}
              </div>



              {component}
            </>
          )

          // for develop
          : (
            <div className={style.content}>
              <p className={style.text}>
                Unfortunately the page is not ready yet.
              </p>
              <p className={style.text}>
                You can
                {' '}
                <a
                  href="./files/CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={classNames(getCurrentClassNames(style, 'link', season))}
                >
                  OPEN
                </a>
                {' '}
                ore
                {' '}
                <a
                  href="./files/CV.pdf"
                  className={classNames(getCurrentClassNames(style, 'link', season))}
                  download
                >
                  DOWNLOAD
                </a>
                {' '}
                my CV
              </p>
              <p className={style.text}>
                Other info coming soon.
              </p>
              <p className={style.text}>
                P.S. Introduce was added
              </p>
            </div>
          )
        }


    </main>
  );
};
