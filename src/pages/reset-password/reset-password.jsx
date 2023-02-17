import {useEffect} from 'react';
import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from './../../hooks/useInput';
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../utils/asyncFunctions';

const ResetPassword = () => {

  const { user } = useSelector(store => store.user);

  const password = useInput('');
  const code = useInput('');
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgotPage = location.state && location.state.from.pathname === '/forgot-password';

  const body = {
    "password" : password.value, 
    "token" : code.value
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(body))
      .then(res => {
        if(res.payload.success) {
          navigate('/login')
        }
      })
  }

  useEffect(() => {
    if (forgotPage === null) {
      navigate(-1)
    }
  }, [])

  if (user) { 
      return (
        <Navigate to="/" replace />
      );
    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Entrance title='Восстановление пароля' buttonText='Сохранить'>
          <PasswordInput
            {...password}
            name={'password'}
            extraClass="mb-6"
          />
          <Input
            {...code}
            type={'text'}
            name={'code'}
            isIcon={false}
            extraClass="mb-6"
            placeholder='Введите код из письма'
          />
        </Entrance> 
      </form>
      <EntranceNavigation 
        text='Вспомнили пароль?' 
        link='/login'
        linkText='Войти'    
      />
    </>
  );
};

export default ResetPassword;