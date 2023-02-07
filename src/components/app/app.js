import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom'; 
import AppHeader from "../app-header/app-header";
import styles from './app.module.css';
import BurgerMain from '../../pages/burger-main/burger-main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import { fetchIngredientsData } from "../../redux/slices/ingredientsSlice";
import { useDispatch } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../redux/slices/currentIngredientSlice';
import { ORDER_MODAL_STATE } from '../../redux/slices/orderSlice';


function App() {
    const dispatch = useDispatch();

    const handleModalClose = () => {
        dispatch(CURRENT_INGREDIENT(null))
        dispatch(ORDER_MODAL_STATE(false))
    }

    useEffect(() => {
        dispatch(fetchIngredientsData())
    }, [dispatch])

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<BurgerMain handleModalClose={handleModalClose} />} />
          <Route path='/login' element={<Login handleModalClose={handleModalClose} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
