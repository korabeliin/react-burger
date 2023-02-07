import React from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from './burger-main.module.css';

const BurgerMain = ({handleModalClose}) => {
  return (
    <main className={styles.burgerContainer}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients handleModalClose={handleModalClose} />
        <BurgerConstructor handleModalClose={handleModalClose}/>
      </DndProvider>
    </main>
  );
};

BurgerConstructor.propTypes = {
  handleModalClose: PropTypes.func.isRequired
}

export default BurgerMain;