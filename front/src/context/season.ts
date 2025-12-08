import React from "react";
import { Season } from "../styles/functions";

export const SeasonContext = React.createContext(Season.winter);

export const getCurrentSeason = (setSeason: (arg: Season) => void) => {
  // const date: number = 1;
  const date = new Date().getMonth();
  // місяці рахуються з 0

  switch (date) {
    case 2:
    case 3:
    case 4:
      return setSeason(Season.spring);

    case 5:
    case 6:
    case 7:
      return setSeason(Season.summer);

    case 8:
    case 9:
    case 10:
      return setSeason(Season.autumn);

    default:
      return setSeason(Season.winter);
  }
};
