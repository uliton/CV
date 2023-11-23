import React from "react";
import { Season } from "../styles/styles";

export const Context = React.createContext(Season.winter);

export const getCurrentSeason = (setSeason: (arg: Season) => void) => {
  const date: number = 1;
    // const date = new Date().getMonth();

    switch (date) {
      case 3:
      case 4:
      case 5:
        return setSeason(Season.spring);
      
      case 6:
      case 7:
      case 8:
        return setSeason(Season.summer);
      
      case 9:
      case 10:
      case 11:
        return setSeason(Season.autumn);
      
      default:
        return setSeason(Season.winter);
    }
}