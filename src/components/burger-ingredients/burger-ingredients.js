import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import {ingredientType} from '../../utils/types';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = React.memo( ({ingredients, handleModalOpen, handleModalClose, isModalOpen, currentIngredient}) => {

    const [current, setCurrent] = useState('one');

    // console.log(ingredients)

    return (
        <section className={[styles.burgerIngredientsContainer, 'pt-10 pb-10'].join(' ')}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <nav>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
            <div className={[styles.ingredients, 'custom-scroll'].join(' ')}>
                <div className='buns'>
                    <h3 className="mt-10 text text_type_main-medium">Булки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {ingredients.data
                            .filter(el => el.type === 'bun')
                            .map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                    onModalOpen={handleModalOpen}
                                />
                            )
                        }
                    </ul>
                </div>
                <div className='sauces'>
                    <h3 className="mt-10 text text_type_main-medium">Соусы</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {ingredients.data
                            .filter(el => el.type === 'sauce')
                            .map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                    onModalOpen={handleModalOpen}
                                />
                            )
                        }
                    </ul>
                </div>
                <div className='fillings'>
                    <h3 className="mt-10 text text_type_main-medium">Начинки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {ingredients.data
                            .filter(el => el.type === 'main')
                            .map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                    onModalOpen={handleModalOpen}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>

            <Modal isModalOpen={isModalOpen} onModalClose={handleModalClose} header='Детали ингредиента'>
                <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
        </section>
    );
});

BurgerIngredients.propTypes = {
    ingredients: PropTypes.shape({
        data: PropTypes.arrayOf(ingredientType.isRequired).isRequired
    }),
    handleModalOpen: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    currentIngredient: ingredientType

}

export default BurgerIngredients;