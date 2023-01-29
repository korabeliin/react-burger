import React, {useEffect} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { fetchIngredientsData } from "../../redux/slices/ingredientsSlice";
import { useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../redux/slices/currentIngredientSlice';
import { ORDER_MODAL_STATE } from '../../redux/slices/orderSlice';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch();

    const handleModalClose = () => {
        dispatch(CURRENT_INGREDIENT(null))
        dispatch(ORDER_MODAL_STATE(false))
    }

    useEffect(() => {
        dispatch(fetchIngredientsData())
    }, [dispatch])

  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.burgerContainer}>

        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients handleModalClose={handleModalClose} />
            <BurgerConstructor handleModalClose={handleModalClose}/>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
