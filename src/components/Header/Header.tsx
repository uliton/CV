import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import MOCK from "../../mockData.json";

import { Context } from "../../context/season";
import { getCurrentClassNames } from "../../styles/functions";
import style from "./Header.module.scss";

export const Header: React.FC = () => {
  const season = useContext(Context);
  const links: Nav = MOCK.nav;

  return (
    <header
      className={classNames(getCurrentClassNames(style, "header", season))}
    >
      <div className="container">
        <Link
          to="/"
          className={classNames(getCurrentClassNames(style, "link", season))}
        >
          <h1 className={style.title}>{MOCK.name}</h1>
        </Link>

        <nav className={style.nav}>
          <ul className={style.list}>
            {Object.entries(links).map(([name, path], i) => (
              <li key={i} className={style.item}>
                <Link
                  to={path}
                  className={classNames(
                    getCurrentClassNames(style, "link", season)
                  )}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
