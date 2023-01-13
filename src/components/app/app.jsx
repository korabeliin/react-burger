import React, {useCallback, useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

function App() {

    const URL = 'https://norma.nomoreparties.space/api/ingredients';
    const [ingredients, setIngredients] = useState({
        data: []
    });

    const [currentIngredient, setCurrentIngredient] = useState({});

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleModalClose = useCallback( () => {
        setIsModalOpen(false);
        setIsButtonClicked(false)
    }, [])

    const handleModalOpen = useCallback(  (data) => {
        setCurrentIngredient(data)
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

    // console.log(ingredients)

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.burgerContainer}>
          <BurgerIngredients
              handleModalClose={handleModalClose}
              isModalOpen={isModalOpen}
              currentIngredient={currentIngredient}
              handleModalOpen={handleModalOpen}
              ingredients={ingredients} />
          <BurgerConstructor
              ingredients={ingredients}
              handleModalClose={handleModalClose}
              isButtonClicked={isButtonClicked}
              setIsButtonClicked={setIsButtonClicked}
          />
      </main>
    </div>
  );
}

export default App;
