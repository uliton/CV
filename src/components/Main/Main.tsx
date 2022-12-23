import React from "react";

export const Main: React.FC = () => (
  <div className="snow_wrap">
    <div className="snow"></div>

    <div className="container">
      <div className="main">
        <p className="main__text">
          Unfortunately the page is not ready yet.
        </p>
        <p className="main__text">
          You can
          {' '}
          <a
            href="./files/Oleksandr_Kharutsa_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="main__link"
          >
            OPEN
          </a>
          {' '}
          ore
          {' '}
          <a
            href="./files/Oleksandr_Kharutsa_CV.pdf"
            className="main__link"
            download
          >
            DOWNLOAD
          </a>
          {' '}
          my CV 
        </p>
        <p className="main__text">
          Other info coming soon.
        </p>
        {/* <p className="main__text">
          P.S. Introduce was added
        </p> */}
      </div>
    </div>
  </div>
);
