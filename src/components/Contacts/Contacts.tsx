import React from "react";
import './Contacts.scss';
import phone from '../../images/icons/phone.svg';
import email from '../../images/icons/email.svg';
import linkedin from '../../images/icons/linkedin.svg';
import telegram from '../../images/icons/telegram.svg';
import github from '../../images/icons/github.svg';
import photo from '../../images/own/png/4077.png';

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
          target="_blank"
          rel="noreferrer"
        >
          <img src={phone} alt="phone" className="icon" />
        </a>
        
        <a
          href="mailto:al.haruca@gmail.com"
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={email} alt="email" className="icon" />
        </a>
        
        <a
          href="https://www.linkedin.com/in/alex-haruca/"
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedin} alt="linkedin" className="icon" />
        </a>
        
        <a
          href="https://t.me/a_haruca"
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={telegram} alt="telegram" className="icon" />
        </a>
        
        <a
          href="https://github.com/uliton"
          className="link"
          target="_blank"
          rel="noreferrer"
        >
          <img src={github} alt="telegram" className="icon" />
        </a>
      </div>

      <img src={photo} alt="background" className="photo" />
    </div>
  );
};
