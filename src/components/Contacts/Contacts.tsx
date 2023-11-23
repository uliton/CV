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

type Props = {}

export const Contacts: React.FC<Props> = () => {
  const season = useContext(Context);

  return (
    <div className={classNames(getCurrentClassNames(style, 'contacts', season))}>
      <div className="container">
        <div className={style.content}>
          <p className={style.title}>
            You always can easily connect with me!
          </p>

          <div className={style.list}>
            {/* <a
              href="tel:+380930002600"
              className={style.link}
              title="Phone"
            >
              <img src={phone} alt="phone" className={style.icon} />
            </a> */}

            <a
              href="mailto:al.haruca@gmail.com"
              className={style.link}
              title="Mail"
              target="_blank"
              rel="noreferrer"
            >
              <img src={email} alt="email" className={style.icon} />
            </a>

            {/* <a
              href="https://join.skype.com/invite/F7I3vcdduHsv"
              className={style.link}
              title="skype"
              target="_blank"
              rel="noreferrer"
            >
              <img src={skype} alt="skype" className={style.icon} />
            </a> */}

            <a
              href="https://www.linkedin.com/in/alex-haruca/"
              className={style.link}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
            >
              <img src={linkedin} alt="linkedin" className={style.icon} />
            </a>

            {/* <a
              href="https://www.facebook.com/a.haruca"
              className={style.link}
              target="_blank"
              rel="noreferrer"
              title="facebook"
            >
              <img src={facebook} alt="facebook" className={style.icon} />
            </a> */}

            <a
              href="https://t.me/a_haruca"
              className={style.link}
              target="_blank"
              rel="noreferrer"
              title="Telegram"
            >
              <img src={telegram} alt="telegram" className={style.icon} />
            </a>

            {/* <a
              href="https://wa.me/380930002600"
              className={style.link}
              target="_blank"
              rel="noreferrer"
              title="whatsapp"
            >
              <img src={whatsapp} alt="whatsapp" className={style.icon} />
            </a> */}

            {/* <a
              href="https://msng.link/o/?380930002600=vi"
              className={style.link}
              target="_blank"
              rel="noreferrer"
              title="viber"
            >
              <img src={viber} alt="viber" className={style.icon} />
            </a> */}

            {/* <a
              href="https://www.instagram.com/x3m_"
              className={style.link}
              target="_blank"
              rel="noreferrer"
              title="instagram"
            >
              <img src={instagram} alt="instagram" className={style.icon} />
            </a> */}

            <a
              href="https://github.com/uliton"
              className={style.link}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              <img src={github} alt="GitHub" className={style.icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
