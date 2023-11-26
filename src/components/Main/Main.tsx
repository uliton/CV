import React, { useContext, useState } from 'react';
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
    </main>
  );
};
