import React, { useContext } from 'react';
import classNames from 'classnames';
import { getCurrentClassNames } from '../../styles/styles';
import { Context } from '../../context/season';

// import phone from '../../images/icons/phone.svg';
import email from '../../images/icons/email.svg';
import linkedin from '../../images/icons/linkedin.svg';
import telegram from '../../images/icons/telegram.svg';
import github from '../../images/icons/github.svg';
// import facebook from '../../images/icons/facebook.svg';
// import skype from '../../images/icons/skype.svg';
// import viber from '../../images/icons/viber.svg';
// import whatsapp from '../../images/icons/whatsapp.svg';
// import instagram from '../../images/icons/instagram.svg';

import style from './Contacts.module.scss';
import { Link } from 'react-router-dom';

type Props = {}

export const Contacts: React.FC<Props> = () => {
  const season = useContext(Context);
  const fileUrl = '/files/CV.pdf';

  return (
    <div className={classNames(getCurrentClassNames(style, 'contacts', season))}>
      <div className="container">
        <div className={style.content}>
          <p className={style.title}>
            You also can
            {' '}
            <a
              href={process.env.PUBLIC_URL + fileUrl}
              target="_blank"
              rel="noreferrer"
              className={classNames(getCurrentClassNames(style, 'link', season))}
            >
              OPEN
            </a>
            {' '}
            ore
            {' '}
            <a
              href={process.env.PUBLIC_URL + fileUrl}
              className={classNames(getCurrentClassNames(style, 'link', season))}
              download
            >
              DOWNLOAD
            </a>
            {' '}
            my CV
            <br />
            And always can easily connect with me!
          </p>

          <div className={style.list}>
            {/* <Link
              to="tel:+380930002600"
              className={style['icon-link']}
              title="Phone"
            >
              <img src={phone} alt="phone" className={style['icon-link__icon']} />
            </Link> */}

            <Link
              to="mailto:al.haruca@gmail.com"
              className={style['icon-link']}
              title="Mail"
              target="_blank"
              rel="noreferrer"
            >
              <img src={email} alt="email" className={style['icon-link__icon']} />
            </Link>

            {/* <Link
              to="https://join.skype.com/invite/F7I3vcdduHsv"
              className={style['icon-link']}
              title="skype"
              target="_blank"
              rel="noreferrer"
            >
              <img src={skype} alt="skype" className={style['icon-link__icon']} />
            </Link> */}

            <Link
              to="https://www.linkedin.com/in/alex-haruca/"
              className={style['icon-link']}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <img src={linkedin} alt="linkedin" className={style['icon-link__icon']} />
            </Link>

            {/* <Link
              to="https://www.facebook.com/a.haruca"
              className={style['icon-link']}
              target="_blank"
              rel="noreferrer"
              title="facebook"
            >
              <img src={facebook} alt="facebook" className={style['icon-link__icon']} />
            </Link> */}

            <Link
              to="https://t.me/a_haruca"
              className={style['icon-link']}
              target="_blank"
              rel="noreferrer"
              title="Telegram"
            >
              <img src={telegram} alt="telegram" className={style['icon-link__icon']} />
            </Link>

            {/* <Link
              to="https://wa.me/380930002600"
              className={style['icon-link']}
              target="_blank"
              rel="noreferrer"
              title="whatsapp"
            >
              <img src={whatsapp} alt="whatsapp" className={style['icon-link__icon']} />
            </Link> */}

            {/* <Link
              to="https://msng.link/o/?380930002600=vi"
              className={style['icon-link']}
              target="_blank"
              rel="noreferrer"
              title="viber"
            >
              <img src={viber} alt="viber" className={style['icon-link__icon']} />
            </Link> */}

            {/* <Link
              to="https://www.instagram.com/x3m_"
              className={style['icon-link']}
              target="_blank"
              rel="noreferrer"
              title="instagram"
            >
              <img src={instagram} alt="instagram" className={style['icon-link__icon']} />
            </Link> */}

            <Link
              to="https://github.com/uliton"
              className={style['icon-link']}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              <img src={github} alt="GitHub" className={style['icon-link__icon']} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
