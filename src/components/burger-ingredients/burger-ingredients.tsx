import {useState, useMemo} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import {TIngredient} from "../../utils/types";

const BurgerIngredients = () => {

    const [, setCurrent] = useState('buns');
    const ingredients = useSelector((store: any) => store.ingredients.ingredients);

    const onTabClick = (tab:string) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if(element) element.scrollIntoView({behavior: "smooth", block: "nearest"});
    }


    const buns = useMemo(() => {
        return ingredients.filter((el: TIngredient) => el.type === 'bun')
    }, [ingredients])

    const sauces = useMemo(() => {
        return ingredients.filter((el: TIngredient) => el.type === 'sauce')
    }, [ingredients])

    const fillings = useMemo(() => {
        return ingredients.filter((el: TIngredient) => el.type === 'main')
    }, [ingredients])


    const {ref: bunsRef, inView: bunsInView } = useInView({
        threshold: .5
    })

    const {ref: saucesRef, inView: saucesInView } = useInView({
        threshold: .5
    })

    const {ref: fillingsRef, inView: fillingsInView } = useInView({
        threshold: .2
    })
    
    return (
        <section className={`${styles.burgerIngredientsContainer} pt-10 pb-10 `}>
            <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
            <nav>
                <Tab value="buns" active={bunsInView} onClick={() => onTabClick('buns')}>
                    Булки
                </Tab>
                <Tab value="sauces" active={saucesInView} onClick={() => onTabClick('sauces')}>
                    Соусы
                </Tab>
                <Tab value="fillings" active={fillingsInView} onClick={() => onTabClick('fillings')}>
                    Начинки
                </Tab>
                
            </nav>
            <div className={`${styles.ingredients} custom-scroll`}>
                <div ref={bunsRef} id='buns'>
                    <h3 className="mt-10 text text_type_main-medium">Булки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {buns.map((el: TIngredient) =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                />
                            )
                        }
                    </ul>
                </div>
                <div ref={saucesRef} id='sauces'>
                    <h3 className="mt-10 text text_type_main-medium">Соусы</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {sauces.map((el: TIngredient) =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                />
                            )
                        }
                    </ul>
                </div>
                <div ref={fillingsRef} id='fillings'>
                    <h3 className="mt-10 text text_type_main-medium">Начинки</h3>
                    <ul className='pl-4 pr-4 pt-4'>
                        {fillings.map((el: TIngredient) =>
                                <BurgerIngredientsItem
                                    key={el._id}
                                    ingredient={el}
                                />
                            )
                        }
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default BurgerIngredients;