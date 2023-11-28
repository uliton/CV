import React from 'react';
import MOCK from '../../mockData.json';
// import photo from './intro-320.jpg';
import photo from './avatar.jpg';

import style from './Introduce.module.scss';
import { Sport } from '../Sport';

type Props = {}

export const Introduce: React.FC<Props> = () => {
  const introduceText: string[] = MOCK.about;

  return (
    <div className={style.introduce}>
      <div className={style.introduce__contant}>
        <img src={photo} alt='avatar' className={style.introduce__photo}/>

        {introduceText.map((text, i) => (
          <p key={i} className={style.introduce__text}>
            {text}
          </p>
        ))}
      </div>

      <div className={style.hobby}>
        <p className={style.hobby__title}>
          Hobby and sport
        </p>

      </div>
      <Sport />
    </div>
  );
};
