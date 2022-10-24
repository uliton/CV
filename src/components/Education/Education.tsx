import React from "react";
import { SelfEducation } from "../SelfEducation";

export const Education = () => {
  return (
    <div className="education">
      <ul className="education__list">
        <li className="education__item item">
          <p className="item__text">
            Graduated from Kyiv National Economic University (KNEU) in 2004, specializing in economics and entrepreneurship with advanced English studying, got a bachelor's degree.
          </p>
        </li>
        <li className="education__item item">
          <p className="item__text">
            Received a master's degree in consulting in 2005.
          </p>
        </li>
        <li className="education__item item">
          <p className="item__text">
            Passed 3-months English summer school in Great Britain in 2002.
          </p>
        </li>
      </ul>

      <SelfEducation />
    </div>
  );
};
