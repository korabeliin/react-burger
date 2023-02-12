import { Link } from 'react-router-dom';
import styles from './entrance-navigation.module.css';
import PropTypes from 'prop-types';

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

EntranceNavigation.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  secondText: PropTypes.string,
  secondLink: PropTypes.string,
  secondLinkText: PropTypes.string
}

export default EntranceNavigation;