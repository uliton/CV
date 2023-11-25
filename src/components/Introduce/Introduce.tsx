import React from 'react';
import MOCK from '../../mockData.json';
import photo from "./intro-320.jpg";

import style from './Introduce.module.scss';

type Props = {}

export const Introduce: React.FC<Props> = () => {
  const introduceText = MOCK.about;

  return (
    <div className={style.introduce}>
      <img src={photo} alt="avatar" className={style.photo}/>

      {introduceText.map((text, i) => (
        <p key={i} className={style.text}>
          {text}
        </p>
      ))}
    </div>
  );
};
