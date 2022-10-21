import React from "react";

export const Main: React.FC = () => (
  <div className="main">
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
  </div>
);
