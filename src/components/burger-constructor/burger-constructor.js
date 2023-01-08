import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import fluorescentBun from '../../images/fluorescent-bun.png';

const BurgerConstructor = ({fakeData}) => {

    return (
        <section className={styles.burgerConstructorContainer} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className={styles.burgerContainer}>
                <div className='pl-8 mr-4'>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={fluorescentBun}
                    />
                </div>

                <ul className='pl-8 custom-scroll'>
                    {fakeData.map((el, id) =>
                        <li key={el.id} className='mb-4'>
                            <div className={styles.bullets}>
                                <DragIcon  type="primary" />
                            </div>
                            <div>
                                <ConstructorElement
                                    text={el.text}
                                    price={el.price}
                                    thumbnail={el.thumbnail}
                                    extraClass='mr-2'
                                />
                            </div>
                        </li>
                    )}
                </ul>

                <div className='pl-8 mr-4'>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={fluorescentBun}
                    />
                </div>
            </div>
            <div className={[styles.priceAndOrder, 'mt-10'].join(' ')}>
               <span className="text text_type_digits-medium">
                    610<div className='ml-2'><CurrencyIcon type="primary" /></div>
               </span>
                <Button htmlType="button" type="primary" size="large" extraClass="ml-10">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

const fakeDataPropTypes = PropTypes.shape({
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
})

BurgerConstructor.propTypes = {
    fakeData: PropTypes.arrayOf(fakeDataPropTypes)
}


export default BurgerConstructor;