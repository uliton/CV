import React, { useContext, useState } from "react";
import classNames from "classnames";

import { Context } from "../../context/season";
import { MainComponents, getCurrentComponent } from "../../functions/components";
import { getCurrentClassNames } from "../../styles/functions";
import style from "./Main.module.scss";

type Props = {};

export const Main: React.FC<Props> = () => {
  const season = useContext(Context);

  const buttons = Object.values(MainComponents);
  const [button, setButton] = useState<string>(MainComponents.introduce);

  return (
    <main
      className={classNames(
        "container",
        getCurrentClassNames(style, "main", season)
      )}
    >
      <div className={style["button-bar"]}>
        {buttons.map((btn, i) => (
          <button
            key={i}
            type="button"
            className={classNames({
              [style.button]: true,
              [style["button--active"]]: button === btn,
            })}
            onClick={() => setButton(btn)}
          >
            {btn}
          </button>
        ))}
      </div>

      {getCurrentComponent(button)}
    </main>
  );
};
