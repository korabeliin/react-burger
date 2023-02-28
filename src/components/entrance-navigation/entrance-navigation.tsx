import { Link } from 'react-router-dom';
import styles from './entrance-navigation.module.css';
import { FC } from 'react';

type TEntranceNavigation = {
  text: string;
  link: string;
  linkText: string;
  secondText?: string;
  secondLink?: string;
  secondLinkText?: string;
}

const EntranceNavigation: FC<TEntranceNavigation> = ({text, link, linkText, secondText, secondLink, secondLinkText}) => {
  return (
    <>
      <div className={styles.entranceNavigation}>
        <p>{text}</p>
        <Link to={link}>{linkText}</Link> 
      </div>
      { secondText && secondLink ?
        <div className={styles.entranceNavigation}>
          <p>{secondText}</p>
          <Link to={secondLink}>{secondLinkText}</Link>  
        </div>
        :
        null
      }
    </>
  );
};

export default EntranceNavigation;