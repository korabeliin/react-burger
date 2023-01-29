import React from 'react';
import styles from "./ingredient-details.module.css";
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    
    const currentIngredient = useSelector(store => store.currentIngredient.currentIngredient);

    return (
        <>
            {currentIngredient ?
                <div className={styles.ingredientDetails}>
                    <img className='mb-4' src={currentIngredient.image_large} alt={currentIngredient.name} />
                    <p className="text text_type_main-medium mb-8">{currentIngredient.name}</p>
                    <div className={styles.nutritionInfo}>
                        <p className="text text_type_main-default text_color_inactive">
                            Калории,ккал
                            <span>{currentIngredient.calories}</span>
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Белки,г
                            <span>{currentIngredient.proteins}</span>
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Жиры,г
                            <span>{currentIngredient.fat}</span>
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Углеводы,г
                            <span>{currentIngredient.carbohydrates}</span>
                        </p>
                    </div>
                </div>
                :
                null
            }
        </>

    );
};

export default IngredientDetails;