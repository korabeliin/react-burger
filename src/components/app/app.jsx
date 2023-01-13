import React, {useEffect, useState} from 'react';
import AppHeader from "../app-header/app-header";
import styles from './app.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import withModal from "../hocs/with-modal";

function App() {

    const URL = 'https://norma.nomoreparties.space/api/ingredients';
    const [ingredients, setIngredients] = useState({
        data: []
    });

    useEffect(() => {
        const getIngredientsData = async () => {
            const res = await fetch(URL);
            const resData = await res.json();
            if(resData?.success) {
                setIngredients({ data: resData.data});
            }
        }

        getIngredientsData()
            .catch(() => alert("Во время загрузки ингредиентов произошла ошибка."))

    }, [])

    // console.log(ingredientsData)

    const WithModalConstructor = withModal(BurgerConstructor)

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.burgerContainer}>
          <BurgerIngredients ingredients={ingredients} />
          <WithModalConstructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
