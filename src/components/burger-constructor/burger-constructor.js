import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import fluorescentBun from '../../images/fluorescent-bun.png';
import {ingredientType} from '../../utils/types';
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = React.memo( ({ingredients, handleModalClose, isButtonClicked, setIsButtonClicked}) => {

    return (
        <section className={[styles.burgerConstructorContainer, 'pt-25 pb-2.5'].join(' ')}>
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
                    {ingredients.data.filter(el => el.type !== 'bun').map((el) =>
                        <li key={el._id} className='mb-4'>
                            <div className={styles.bullets}>
                                <DragIcon  type="primary" />
                            </div>
                            <div>
                                <ConstructorElement
                                    text={el.name}
                                    price={el.price}
                                    thumbnail={el.image}
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
                <Button onClick={() => setIsButtonClicked(true)} htmlType="button" type="primary" size="large" extraClass="ml-10">
                    Оформить заказ
                </Button>
            </div>
            <Modal onModalClose={handleModalClose} isButtonClicked={isButtonClicked} >
                <OrderDetails />
            </Modal>
        </section>
    );
});

BurgerConstructor.propTypes = {
    ingredients: PropTypes.shape({
        data: PropTypes.arrayOf(ingredientType.isRequired).isRequired
    }),
    handleModalClose: PropTypes.func.isRequired,
    setIsButtonClicked: PropTypes.func.isRequired,
    isButtonClicked: PropTypes.bool.isRequired
}

export default BurgerConstructor;