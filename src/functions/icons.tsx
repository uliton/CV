import email from '../icons/email.svg';
import linkedin from '../icons/linkedin.svg';
import telegram from '../icons/telegram.svg';
import github from '../icons/github.svg';

enum Icon {
  email = 'Mail',
  linkedin = 'LinkedIn',
  telegram = 'Telegram',
  github = 'GitHub',
}

type Module = {
  [key: string]: string;
}

export const getContactIcon = (title: string, module: Module) => {
  switch (title) {
    case Icon.email:
      return (
        <img src={email} alt={title} className={module['icon-link__icon']} />
      )
    
    case Icon.linkedin:
      return (
        <img src={linkedin} alt={title} className={module['icon-link__icon']} />
      )
    
    case Icon.telegram:
      return (
        <img src={telegram} alt={title} className={module['icon-link__icon']} />
      )
    
    case Icon.github:
      return (
        <img src={github} alt={title} className={module['icon-link__icon']} />
      )
    
    default:
      return <></>
  }
}
