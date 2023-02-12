import styles from './entrance.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const Entrance = ({children, title, buttonText, onSubmit}) => {
  return (
    <section className={`${styles.entrance} mt-15`}>
      <h3 className='text text_type_main-medium mb-6'>{title}</h3>
      {children}
      <Button onClick={() => onSubmit()} htmlType="button" type="primary" size="medium" extraClass='mb-20'>
        {buttonText}
      </Button>
    </section>
  );
};

Entrance.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Entrance;