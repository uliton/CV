import React from "react";
import { Link } from 'react-router-dom';

import './Header.scss';

export const Header = () => (
  <div className="header">
    <div className="header__logo">
      <Link to="/" className="header__link">
        Oleksandr Kharutsa
      </Link>
    </div>
  </div>
);
