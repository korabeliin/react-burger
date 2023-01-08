import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import {CurrencyIcon, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = useState('one');

    return (
        <section className={[styles.burgerIngredientsContainer]}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <nav style={{ display: 'flex' }}>
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
                        {data
                            .filter(el => el.type === 'bun')
                            .map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    name={el.name}
                                    price={el.price}
                                    imageSrc={el.image}
                                />
                            )
                        }
                    </ul>
                </div>
                <div className='sauces'>
                    <h3 className="mt-10 text text_type_main-medium">Соусы</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {data
                            .filter(el => el.type === 'sauce')
                            .map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    name={el.name}
                                    price={el.price}
                                    imageSrc={el.image}
                                />
                            )
                        }
                    </ul>
                </div>
                <div className='fillings'>
                    <h3 className="mt-10 text text_type_main-medium">Начинки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {data
                            .filter(el => el.type === 'main')
                            .map(el =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    name={el.name}
                                    price={el.price}
                                    imageSrc={el.image}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>
        </section>
    );
};

const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
})

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerIngredients;