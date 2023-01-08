import React from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import data from '../../utils/data.json';
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {fakeData} from '../../utils/fakeData';

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.burgerContainer}>
          <BurgerIngredients data={data} />
          <BurgerConstructor fakeData={fakeData} />
      </main>
    </div>
  );
}

export default App;
