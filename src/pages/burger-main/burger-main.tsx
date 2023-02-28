import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from './burger-main.module.css';
import { FC } from "react";

type TBurgerMain = {
  handleModalClose: () => void;
}

const BurgerMain:FC<TBurgerMain> = ({handleModalClose}) => {
  return (
    <main className={styles.burgerContainer}>
      <BurgerIngredients />
      <BurgerConstructor handleModalClose={handleModalClose} />
    </main>
  );
};

export default BurgerMain;