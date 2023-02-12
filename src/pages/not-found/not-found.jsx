import styles from './not-found.module.css';
import { Link } from 'react-router-dom'; 

const NotFound404 = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className='text text_type_main-large mb-20'>Oops! 404 Error</h1>
          <p className='text text_type_main-default mb-5'>The page you requested does not exist</p>
          <p className='text text_type_main-default'>check the address or try <Link to='/' className={styles.link}>homepage</Link></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;