import React from "react";
import './Contacts.scss';
import phone from './icons/phone.svg';
import email from './icons/email.svg';
import linkedin from './icons/linkedin.svg';
import telegram from './icons/telegram.svg';
import github from './icons/github.svg';
import facebook from './icons/facebook.svg';
import skype from './icons/skype.svg';
import viber from './icons/viber.svg';
import whatsapp from './icons/whatsapp.svg';
import instagram from './icons/instagram.svg';
import photo320 from './images/contacts-320.png';

export const Contacts = () => {
  return (
    <div className="contacts">
      <p className="contacts__preview-text">
        You always can easily connect with me!
      </p>

      <div className="contacts__container">
        <a
          href="tel:+380930002600"
          className="link"
          title="Phone"
        >
          <img src={phone} alt="phone" className="icon" />
        </a>

        <a
          href="mailto:al.haruca@gmail.com"
          className="link"
          title="Mail"
        >
          <img src={email} alt="email" className="icon" />
        </a>

        <a
          href="https://join.skype.com/invite/F7I3vcdduHsv"
          className="link"
          target="_blank"
          rel="noreferrer"
          title="skype"
        >
          <img src={skype} alt="skype" className="icon" />
        </a>

        <a
          href="https://www.linkedin.com/in/alex-haruca/"
          className="link"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
        >
          <img src={linkedin} alt="linkedin" className="icon" />
        </a>

        <a
          href="https://www.facebook.com/a.haruca"
          className="link"
          target="_blank"
          rel="noreferrer"
          title="facebook"
        >
          <img src={facebook} alt="facebook" className="icon" />
        </a>

        <a
          href="https://t.me/a_haruca"
          className="link"
          target="_blank"
          rel="noreferrer"
          title="Telegram"
        >
          <img src={telegram} alt="telegram" className="icon" />
        </a>

        <a
          href="https://wa.me/380930002600"
          className="link"
          target="_blank"
          rel="noreferrer"
          title="whatsapp"
        >
          <img src={whatsapp} alt="whatsapp" className="icon" />
        </a>

        <a
          href="https://msng.link/o/?380930002600=vi"
          className="link"
          target="_blank"
          rel="noreferrer"
          title="viber"
        >
          <img src={viber} alt="viber" className="icon" />
        </a>

        <a
          href="https://www.instagram.com/x3m_"
          className="link"
          target="_blank"
          rel="noreferrer"
          title="instagram"
        >
          <img src={instagram} alt="instagram" className="icon" />
        </a>

        <a
          href="https://github.com/uliton"
          className="link"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
        >
          <img src={github} alt="telegram" className="icon" />
        </a>

        <img src={photo320} alt="background" />
      </div>

    </div>
  );
};
