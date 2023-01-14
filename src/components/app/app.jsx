import React, {useCallback, useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {

    const URL = 'https://norma.nomoreparties.space/api/ingredients';
    const [ingredients, setIngredients] = useState({
        data: []
    });

    const [currentIngredient, setCurrentIngredient] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = useCallback( () => {
        setIsModalOpen(false);
        setCurrentIngredient(null)
    }, [])

    const handleModalOpen = useCallback(  (data) => {
        if(data) {
            setCurrentIngredient(data)
        }
        setIsModalOpen(true);
    }, [])

    useEffect(() => {
        const getIngredientsData = async () => {
            try {
                const res = await fetch(URL);
                if(res.ok) {
                    const resData = await res.json();
                    if(resData?.success) {
                        setIngredients({ data: resData.data});
                    }
                }
            }  catch(err) {
                alert(err);
            }
        }

        getIngredientsData()
            .catch(() => alert("Во время загрузки ингредиентов произошла ошибка."))

    }, [])

    // console.log(currentIngredient)

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.burgerContainer}>
          <BurgerIngredients
              handleModalOpen={handleModalOpen}
              ingredients={ingredients} />
          <BurgerConstructor
              ingredients={ingredients}
              handleModalOpen={handleModalOpen}
          />

          {currentIngredient ?
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
