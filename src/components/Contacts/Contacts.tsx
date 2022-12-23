import React from "react";
import phone from '../../images/icons/phone.svg';
import email from '../../images/icons/email.svg';
import linkedin from '../../images/icons/linkedin.svg';
import telegram from '../../images/icons/telegram1.svg';
import github from '../../images/icons/github.svg';
import facebook from '../../images/icons/facebook.svg';
import skype from '../../images/icons/skype.svg';
import viber from '../../images/icons/viber.svg';
import whatsapp from '../../images/icons/whatsapp.svg';
import instagram from '../../images/icons/instagram.svg';

// import { ONLINE_ORDERS_MOCK } from "../../mockData";

export const Contacts = () => {
  // const contacts = ONLINE_ORDERS_MOCK.find(section => section.section === 'contacts');
  // console.log(contacts);

  return (
  <div className="snow_wrap">
    <div className="snow"></div>

    <div className="contacts">
      <div className="container">
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
            target="_blank"
            rel="noreferrer"
          >
            <img src={email} alt="email" className="icon" />
          </a>

          <a
            href="https://join.skype.com/invite/F7I3vcdduHsv"
            className="link"
            title="skype"
            target="_blank"
            rel="noreferrer"
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
            <img src={github} alt="GitHub" className="icon" />
          </a>
        </div>
      </div>
    </div>
  </div>
  );
};
