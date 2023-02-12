import PropTypes from 'prop-types';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from './burger-main.module.css';

const BurgerMain = ({handleModalClose}) => {
  return (
    <main className={styles.burgerContainer}>
      <BurgerIngredients handleModalClose={handleModalClose} />
      <BurgerConstructor handleModalClose={handleModalClose}/>
    </main>
  );
};

BurgerConstructor.propTypes = {
  handleModalClose: PropTypes.func.isRequired
}

export default BurgerMain;