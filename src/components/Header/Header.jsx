import React from "react";
import { Link } from 'react-router-dom';

export const Header = () => (
  <div className="header">
    <div className="header__wrapper">
      <div className="container">
        <div className="header__logo">
          <Link to="/" className="header__link">
            Oleksandr Kharutsa
          </Link>
        </div>

        <nav className="header__nav nav">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to='/' className="nav__link">
                main
              </Link>
            </li>
            {/* <li className="nav__item">
              <Link to='/introduce' className="nav__link">
                introduce
              </Link>
            </li> */}
            {/* <li className="nav__item">
              <Link to='/portfolio' className="nav__link">
                portfollio
              </Link>
            </li> */}
            <li className="nav__item">
              <Link to='/contacts' className="nav__link">
                contacts
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
);
