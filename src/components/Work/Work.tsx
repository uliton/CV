import React, { useContext, useState } from 'react';
import style from './Work.module.scss';
import classNames from 'classnames';
import { getCurrentClassNames } from '../../styles/styles';
import { Context } from '../../context/season';
import { Experience } from '../Experience';
import { Portfolio } from '../Portfolio';

enum Categories {
  experience = "experience",
  portfolio = "portfolio",
}

type Props = {}

export const Work: React.FC<Props> = () => {
  const season = useContext(Context);

  const buttons = Object.values(Categories);
  const [component, setComponent] = useState(<Portfolio />);
  const [button, setButton] = useState<string>(Categories.portfolio);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | any) => {
    switch (event.target.value) {
      case Categories.portfolio:
        setComponent(<Portfolio />);
        setButton(Categories.portfolio);
        break;

      default:
        setComponent(<Experience />);
        setButton(Categories.experience);
    }
  };

  return (
    <main className={classNames('container', getCurrentClassNames(style, 'work', season))}>
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
