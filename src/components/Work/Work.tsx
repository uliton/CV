import React, { useContext, useState } from "react";
import classNames from "classnames";

import { Context } from "../../context/season";
import { WorkComponents, getCurrentComponent } from "../../functions/components";
import { getCurrentClassNames } from "../../styles/functions";
import style from "./Work.module.scss";

type Props = {};

export const Work: React.FC<Props> = () => {
  const season = useContext(Context);

  const buttons = Object.values(WorkComponents);
  const [button, setButton] = useState<string>(WorkComponents.experience);

  return (
    <main
      className={classNames(
        "container",
        getCurrentClassNames(style, "work", season)
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
