import React, {useCallback, useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { fetchIngredientsData } from "../../redux/slices/ingredientsSlice";
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../redux/slices/ingredientsSlice';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    const currentIngredient = useSelector(store => store.ingredients.currentIngredient);

    // console.log(currentIngredient)

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = useCallback( () => {
        setIsModalOpen(false);
        dispatch(CURRENT_INGREDIENT({}))
    }, [])

    const handleModalOpen = useCallback( (data) => {
        if(data) {
            dispatch(CURRENT_INGREDIENT(data))
        }
        setIsModalOpen(true);
    }, [])

    useEffect(() => {
        dispatch(fetchIngredientsData())
    }, [dispatch])

  return (
    <div className={styles.app}>
        <AppHeader />
        <main className={styles.burgerContainer}>

        <DndProvider backend={HTML5Backend}>
            <BurgerIngredients handleModalOpen={handleModalOpen} />
            <BurgerConstructor handleModalOpen={handleModalOpen}/>
        </DndProvider>
        
        {Object.keys(currentIngredient).length ?
            <Modal isModalOpen={isModalOpen} onModalClose={handleModalClose} header='Детали ингредиента'>
                <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
            :
            isModalOpen ?
                <Modal onModalClose={handleModalClose} isModalOpen={isModalOpen}>
                    <OrderDetails />
                </Modal>
                :
                null
        }
      </main>
    </div>
  );
}

export default App;
