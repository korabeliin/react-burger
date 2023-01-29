import React, {useRef, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { useSelector } from 'react-redux';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = ({handleModalClose}) => {

    const [current, setCurrent] = useState('buns');

    const ingredients = useSelector(store => store.ingredients.ingredients);
    const currentIngredient = useSelector(store => store.currentIngredient.currentIngredient);

    const onTabClick = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if(element) element.scrollIntoView({behavior: "smooth", block: "nearest"});
    }

    const ingredientsRef = useRef(null);

    const buns = useMemo(() => {
        return ingredients.filter(el => el.type === 'bun')
    }, [ingredients])

    const sauces = useMemo(() => {
        return ingredients.filter(el => el.type === 'sauce')
    }, [ingredients])

    const fillings = useMemo(() => {
        return ingredients.filter(el => el.type === 'main')
    }, [ingredients])

    const handleScroll = () => {
        const scrollTop = ingredientsRef.current.scrollTop

        if(scrollTop < 100) setCurrent('buns')
        if(scrollTop > 300 && scrollTop < 800) setCurrent('sauces')
        if(scrollTop > 800) setCurrent('fillings')
    }

    return (
        <section className={`${styles.burgerIngredientsContainer} pt-10 pb-10 `}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <nav>
                <Tab value="buns" active={current === 'buns'} onClick={() => onTabClick('buns')}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={() => onTabClick('sauces')}>
                    Соусы
                </Tab>
                <Tab value="fillings" active={current === 'fillings'} onClick={() => onTabClick('fillings')}>
                    Начинки
                </Tab>
                
            </nav>
            <div ref={ingredientsRef} onScroll={handleScroll} className={`${styles.ingredients} custom-scroll`}>
                <div className='buns' id='buns'>
                    <h3 className="mt-10 text text_type_main-medium">Булки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {buns.map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                />
                            )
                        }
                    </ul>
                </div>
                <div className='sauces' id='sauces'>
                    <h3 className="mt-10 text text_type_main-medium">Соусы</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {sauces.map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                />
                            )
                        }
                    </ul>
                </div>
                <div className='fillings' id='fillings'>
                    <h3 className="mt-10 text text_type_main-medium">Начинки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {fillings.map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>
            {currentIngredient && 
                <Modal onModalClose={handleModalClose} header='Детали ингредиента'>
                    <IngredientDetails currentIngredient={currentIngredient} />
                </Modal>
            }
        </section>
    );
};

BurgerIngredients.propTypes = {
    handleModalClose: PropTypes.func.isRequired
}

export default BurgerIngredients;