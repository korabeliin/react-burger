import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredientsItem = ({name, price, imageSrc, imageAlt}) => {
    return (
        <li className='pl-4 pr-4 mb-10'>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={imageSrc} alt={imageAlt} />
            <span className={[styles.test, 'text text_type_digits-default'].join(' ')}>
                {price}
                <div className='ml-2'><CurrencyIcon type="primary" /></div>
            </span>
            <p className="text text_type_main-default">{name}</p>
        </li>
    );
};

BurgerIngredientsItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageSrc: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
}

export default BurgerIngredientsItem;