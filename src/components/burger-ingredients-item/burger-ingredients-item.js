import React from 'react';
import styles from './burger-ingredients-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientType} from "../../utils/types";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';

const BurgerIngredientsItem = React.memo(({ingredient, onModalOpen}) => {

    const stuffing = useSelector(store => store.ingredients.constructorIngredients.stuffing);
    const bun = useSelector(store => store.ingredients.constructorIngredients.bun);
    const counter = stuffing.filter(el => el.ingredient._id === ingredient._id).length;
   
    // console.log(counter)

    const [, stuffingRef] = useDrag({
        type: "stuffing",
        item: {id: ingredient._id}
    });

    const [, bunRef] = useDrag({
        type: "bun",
        item: {id: ingredient._id}
    });

    return (
        <>
            <li 
                ref={ingredient.type === 'bun' ? bunRef : stuffingRef} 
                className='pl-4 pr-4 mb-10' 
                onClick={() => onModalOpen(ingredient)}
            >
                {
                    ingredient.type === 'bun' ?
                    <div className={bun.bunInfo?._id === ingredient._id ? styles.showCounter : styles.hideCounter}>
                        <Counter count={2} size="default" extraClass="m-1" />
                    </div>
                    :
                    <div className={counter ? styles.showCounter : styles.hideCounter}>
                        <Counter count={counter} size="default" extraClass="m-1" />
                    </div>
                }
                
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