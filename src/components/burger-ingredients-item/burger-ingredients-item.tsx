import {FC, useMemo} from 'react';
import styles from './burger-ingredients-item.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TIngredient, TConstructorIngredient} from "../../utils/types";
import { useDrag } from "react-dnd";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../redux/slices/currentIngredientSlice';
import { Link, useLocation } from 'react-router-dom';

type TBurgerIngredientsItem = {
    ingredient: TIngredient;
}

const BurgerIngredientsItem: FC<TBurgerIngredientsItem> = ({ingredient}) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const stuffing = useSelector((store: any) => store.constructorIngredients.constructorIngredients.stuffing);
    const bun = useSelector((store: any) => store.constructorIngredients.constructorIngredients.bun);

    const counter = useMemo(() => {
        return stuffing.filter((el: TConstructorIngredient) => el.ingredient._id === ingredient._id).length;
    }, [stuffing])

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
            <Link
                to={`/ingredients/${ingredient._id}`}
                ref={ingredient.type === 'bun' ? bunRef : stuffingRef} 
                className={`${styles.ingredientItem} pl-4 pr-4 mb-10`} 
                onClick={() => dispatch(CURRENT_INGREDIENT(ingredient))}
                state={{background: location}}
            >
                {
                    ingredient.type === 'bun' ?
                    <div className={bun?.bunInfo._id === ingredient._id ? styles.showCounter : styles.hideCounter}>
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
            </Link>
        </>
    );
};

export default BurgerIngredientsItem;