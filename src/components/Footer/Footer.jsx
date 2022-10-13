import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <nav className="header__nav nav">
      <ul className="nav__list">
        <li>
          <Link to='/introduce' className="nav__item">
            introduce
          </Link>
        </li>
        <li>
          <Link to='/portfolio' className="nav__item">
            portfollio
          </Link>
        </li>
        <li>
          <Link to='/contacts' className="nav__item">
            contacts
          </Link>
        </li>
      </ul>
    </nav>
  </footer>
);
