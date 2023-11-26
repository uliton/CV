import React, { useContext } from "react";
import classNames from "classnames";
import { getCurrentClassNames } from "../../styles/functions";
import { Context } from "../../context/season";
import style from "./NotFound.module.scss";

type Props = {};

export const NotFound: React.FC<Props> = () => {
  const season = useContext(Context);

  return (
    <div
      className={classNames(getCurrentClassNames(style, "notFound", season))}
    >
      Page Not Found!
    </div>
  );
};
