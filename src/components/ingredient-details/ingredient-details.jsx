import React from 'react';
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";

const IngredientDetails = ({ingredient}) => {

    // console.log(ingredient)
    return (
        <div className={styles.ingredientDetails}>
            <img className='mb-4' src={ingredient.image_large} alt={ingredient.name} />
            <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
            <div className={styles.nutritionInfo}>
                <p className="text text_type_main-default text_color_inactive">
                    Калории,ккал
                    <span>{ingredient.calories}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Белки,г
                    <span>{ingredient.proteins}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Жиры,г
                    <span>{ingredient.fat}</span>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Углеводы,г
                    <span>{ingredient.carbohydrates}</span>
                </p>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: ingredientType.isRequired
}

export default IngredientDetails;