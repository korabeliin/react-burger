import React from 'react';
import styles from './burger-ingredients-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientType} from "../../utils/types";
import PropTypes from "prop-types";

const BurgerIngredientsItem = React.memo(({ingredient, onModalOpen}) => {

    return (
        <>
            <li className='pl-4 pr-4 mb-10' onClick={() => onModalOpen(ingredient)}>
                <Counter count={1} size="default" extraClass="m-1" />
                <img src={ingredient.image} alt={ingredient.name} />
                <span className={[styles.test, 'text text_type_digits-default'].join(' ')}>
                {ingredient.price}
                    <div className='ml-2'><CurrencyIcon type="primary" /></div>
                </span>
                <p className="text text_type_main-default">{ingredient.name}</p>
            </li>
        </>
    );
});

BurgerIngredientsItem.propTypes = {
    ingredient: ingredientType.isRequired,
    onModalOpen: PropTypes.func.isRequired,
}

export default BurgerIngredientsItem;