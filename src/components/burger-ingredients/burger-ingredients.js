import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { useSelector } from 'react-redux';

const BurgerIngredients = React.memo( ({handleModalOpen}) => {

    const [current, setCurrent] = useState('buns');

    const ingredients = useSelector(store => store.ingredients.ingredients);

    // const onTabClick = (tab) => {
    //     setCurrent(tab);
    //     const element = document.getElementById(tab);
    //     if(element) element.scrollIntoView({behavior: 'smooth'});
    // }

    const ingredientsRef = useRef(null)

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
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>
            <div ref={ingredientsRef} onScroll={handleScroll} className={`${styles.ingredients} custom-scroll`}>
                <div className='buns' id='buns'>
                    <h3 className="mt-10 text text_type_main-medium">Булки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {ingredients
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
                <div className='sauces' id='sauces'>
                    <h3 className="mt-10 text text_type_main-medium">Соусы</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {ingredients
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
                <div className='fillings' id='fillings'>
                    <h3 className="mt-10 text text_type_main-medium">Начинки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {ingredients
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
        </section>
    );
});

BurgerIngredients.propTypes = {
    handleModalOpen: PropTypes.func.isRequired
}

export default BurgerIngredients;