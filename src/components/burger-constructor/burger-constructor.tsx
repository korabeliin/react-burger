import {FC, useMemo} from 'react';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import styles from './burger-constructor.module.css';
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { ORDER_MODAL_STATE } from '../../redux/slices/orderSlice';
import OrderDetails from "../order-details/order-details";
import {TIngredient, TConstructorIngredient} from "../../utils/types";
import Modal from "../modal/modal";
import { useDrop} from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { 
    ADD_STUFFING_TO_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR
} from '../../redux/slices/constructorIngredientsSlice';
import { useNavigate } from 'react-router-dom';


type TBurgerConstructor = {
    handleModalClose: () => void;
}

type TItemId = {
    id: string;
}

const BurgerConstructor: FC<TBurgerConstructor> = ({handleModalClose}) => {

    const ingredients = useSelector((store: any) => store.ingredients.ingredients);
    const stuffing = useSelector((store: any) => store.constructorIngredients.constructorIngredients.stuffing);
    const bun = useSelector((store: any) => store.constructorIngredients.constructorIngredients.bun);
    const order = useSelector((store: any) => store.order.order);
    const { user } = useSelector((store: any) => store.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleStuffDrop = (itemId: TItemId) => {
        
        const stuff = {
            ingredient: ingredients.find((el:TIngredient) => el._id === itemId.id),
            key: uuidv4()
        }
        dispatch(ADD_STUFFING_TO_CONSTRUCTOR(stuff))
    }

    const handleBunDrop = (itemId: TItemId) => {

        const bun = {
            bunInfo: ingredients.find((el:TIngredient) => el._id === itemId.id),
            chosen: true
        } 
        
        dispatch(ADD_BUN_TO_CONSTRUCTOR(bun))
    }

    const totalPrice = useMemo(()=> {
        let total = 0;

        for (let i in stuffing) {
            total += stuffing[i].ingredient.price
        }

        return bun?.chosen ? total += bun.bunInfo.price * 2 : total;

    }, [stuffing, bun]);

    const [{isHover}, constructorStuffingDropTarget] = useDrop({
        accept: "stuffing",
        drop(itemId: TItemId) {
            handleStuffDrop(itemId);
        },
        collect: monitor => {
            return {isHover: monitor.isOver()}
        }
    });

    const [{isBunHover}, constructorBunDropTarget] = useDrop({
        accept: "bun",
        drop(itemId: TItemId) {
            handleBunDrop(itemId);
        },
        collect: monitor => {
            return {isBunHover: monitor.isOver()}
        }
    });

    const handleOrderButtonClick = () => {
        if(stuffing.length) {
            dispatch(ORDER_MODAL_STATE(true))
        }
        if(!user) {
            navigate('/login');
        }
    }

    return (
        <section className={`${styles.burgerConstructorContainer} pt-25 pb-2.5 pl-8`}>
            <div className={styles.burgerContainer}>
                <div ref={constructorBunDropTarget} className={`${styles.constructorBunsContainer}`}>
                    { bun?.chosen ?
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.bunInfo.name}
                            price={bun.bunInfo.price}
                            thumbnail={bun.bunInfo.image_mobile}
                            extraClass='mr-4 ml-4'
                        />
                        :
                        <div className={[styles.constructorBuns, isBunHover ? styles.active : '', styles.top].join(' ')}>Выберите булки</div>
                    }
                </div>

                <ul ref={constructorStuffingDropTarget} className='custom-scroll'>

                    {stuffing.length ? 
                        stuffing.map((el: TConstructorIngredient, i:number) => {
                            if(el.ingredient.type === 'bun') return;
                            return (
                                <BurgerConstructorItem 
                                    key={el.key} 
                                    text={el.ingredient.name}
                                    thumbnail={el.ingredient.image}
                                    price={el.ingredient.price}
                                    id={el.key} 
                                    index={i}
                                />
                            )
                        })
                        :
                        <div className={[styles.constructorStuffing, isHover ? styles.active : '', 'mr-4'].join(' ')}>Выберите начинку</div>
                    }
                </ul>

                <div className={`${styles.constructorBunsContainer}`}>
                    { bun?.chosen ?
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.bunInfo.name}
                            price={bun.bunInfo.price}
                            thumbnail={bun.bunInfo.image_mobile}
                            extraClass='mr-4 ml-4'
                        />
                        :
                        <div className={[styles.constructorBuns, isBunHover ? styles.active : '', styles.bottom].join(' ')}>Выберите булки</div>
                    }
                </div>

            </div>
            <div className={`${styles.priceAndOrder} mt-10`}>
               <span className="text text_type_digits-medium">
                    {totalPrice}<div className='ml-2'><CurrencyIcon type="primary" /></div>
               </span>
                <Button onClick={handleOrderButtonClick} htmlType="button" type="primary" size="large" extraClass="ml-10">
                    Оформить заказ
                </Button>
            </div>
            {order.isOrderModalOpen && 
                <Modal onModalClose={handleModalClose}>
                    <OrderDetails />
                </Modal>
            }
        </section>
    );
};

export default BurgerConstructor;