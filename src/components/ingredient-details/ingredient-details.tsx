import {useEffect} from 'react';
import styles from "./ingredient-details.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams  } from 'react-router-dom'; 
import { CURRENT_INGREDIENT  } from "../../redux/slices/currentIngredientSlice";
import {TIngredient} from "../../utils/types";

const IngredientDetails = () => {

    const dispatch = useDispatch();
    const ingredients = useSelector((store: any) => store.ingredients.ingredients);
    const currentIngredient = useSelector((store: any) => store.currentIngredient.currentIngredient);
    const location = useLocation();
    const {id: currentItemId} = useParams();

    useEffect(() => {
        const ingredient = ingredients.find((el: TIngredient) => el._id === currentItemId)
        dispatch(CURRENT_INGREDIENT(ingredient))
    }, [location, currentItemId, ingredients, dispatch])
    
    return (
        <>
            {currentIngredient ?
                <div className={styles.ingredientDetails}>
                    <img className='mb-4' src={currentIngredient.image_large} alt={currentIngredient.name} />
                    <p className="text text_type_main-medium mb-8">{currentIngredient.name}</p>
                    <div className={styles.nutritionInfo}>
                        <p className="text text_type_main-default text_color_inactive">
                            Калории,ккал
                            <span>{currentIngredient.calories}</span>
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Белки,г
                            <span>{currentIngredient.proteins}</span>
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Жиры,г
                            <span>{currentIngredient.fat}</span>
                        </p>
                        <p className="text text_type_main-default text_color_inactive">
                            Углеводы,г
                            <span>{currentIngredient.carbohydrates}</span>
                        </p>
                    </div>
                </div>
                :
                null
            }
        </>

    );
};

export default IngredientDetails;