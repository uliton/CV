import React, { useState } from "react";
import './Tests.scss';

export const Tests: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="tests">
      Counter

      <div className="buttons">
        <div className="buttons__description">
          <span>
            simple
          </span>
          <span>
            functional setState
          </span>
          <span>
            with setTimeout
          </span>
        </div>

        <div className="buttons__minus">
          <button
            type="button"
            className="button"
            onClick={() => {setCounter(counter - 1)}}
          >
            - 1
          </button>

          <button
            type="button"
            className="button"
            onClick={() => {setCounter(count => count - 1)}}
          >
            - 1
          </button>

          <button
            type="button"
            className="button"
            onClick={() => {
              setTimeout(() => {
                setCounter(count => count - 1)
              }, 1000)
            }}
          >
            - 1
          </button>
        </div>

        <div className="count">
          {counter}
        </div>

        <div className="buttons__plus">
          <button
            type="button"
            className="button"
            onClick={() => {setCounter(counter + 1)}}
          >
            + 1
          </button>

          <button
            type="button"
            className="button"
            onClick={() => {setCounter(count => count + 1)}}
          >
            + 1
          </button>

          <button
            type="button"
            className="button"
            onClick={() => {
              setTimeout(() => {
                setCounter(count => count + 1)
              }, 1000)
            }}
          >
            + 1
          </button>
        </div>
      </div>
    </div>
  );
};
