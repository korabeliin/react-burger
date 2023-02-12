import {useEffect} from 'react';
import { Routes, Route, useNavigate, useLocation  } from 'react-router-dom'; 
import AppHeader from "../app-header/app-header";
import styles from './app.module.css';
import BurgerMain from '../../pages/burger-main/burger-main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import NotFound404 from '../../pages/not-found/not-found';
import { fetchIngredientsData } from "../../redux/slices/ingredientsSlice";
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../redux/slices/currentIngredientSlice';
import { ORDER_MODAL_STATE } from '../../redux/slices/orderSlice';
import Profile from './../../pages/profile/profile';
import { getUserData, updateToken } from '../../utils/asyncFunctions';
import getCookie from '../../utils/getCookie';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";


function App() {
    const dispatch = useDispatch();
    const currentIngredient = useSelector(store => store.currentIngredient.currentIngredient);
    const ingredients = useSelector(store => store.ingredients.ingredients);

    const { accessToken } = useSelector(store => store.user);
    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch(CURRENT_INGREDIENT(null))
      dispatch(ORDER_MODAL_STATE(false))
      navigate('/')
    }

    useEffect(() => {
      dispatch(fetchIngredientsData())
    }, [dispatch])

  useEffect(() => {
    if(accessToken) {
      dispatch(getUserData(accessToken))
    } else {
      const token = getCookie('token');
      const body = {"token": token}
      dispatch(updateToken(body))
        .then(res => {
        if (res.payload.success && res.payload.refreshToken) {
          document.cookie = `token=${res.payload.refreshToken};`
          navigate('/')
        }
      })
    }
  }, [dispatch, accessToken])

  if(location.pathname.includes('ingredients')) {
    const currentItemId = location.pathname.split('/ingredients/')[1];
    const ingredient = ingredients.find(el => el._id === currentItemId)
    dispatch(CURRENT_INGREDIENT(ingredient))
  } else {
    dispatch(CURRENT_INGREDIENT(null))
  }

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        
        <Routes location={background || location}>
          <Route path='/' element={<BurgerMain handleModalClose={handleModalClose} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='ingredients/:id' element={<IngredientDetails />} />

          <Route 
            path='/profile'
            element={<ProtectedRouteElement element={<Profile />} />}>
            <Route path="orders" element={<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>}/>
          </Route>

          <Route path="*" element={<NotFound404 />}/>
        </Routes>

        {background &&
          <Routes>
            <Route 
              path="ingredients/:id" 
              element={
                currentIngredient && 
                  <Modal onModalClose={handleModalClose} header='Детали ингредиента'>
                      <IngredientDetails currentIngredient={currentIngredient} />
                  </Modal>
              }/>
          </Routes>
        }

      </div>
    </>
  );
}

export default App;
