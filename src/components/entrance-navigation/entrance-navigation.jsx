import React from 'react';
import { Link } from 'react-router-dom';
import styles from './entrance-navigation.module.css';

const EntranceNavigation = ({text, link, linkText, secondText, secondLink, secondLinkText}) => {
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