import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from './../../hooks/useInput';
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../utils/asyncFunctions';

const Login = () => {

  const email = useInput('');
  const password = useInput('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const body = {
    "email" : email.value,
    "password" : password.value
  }

  const handleSubmit = () => {
    dispatch(loginRequest(body))
      .then(res => {
        if (res.payload.success && res.payload.refreshToken) {
          document.cookie = `token=${res.payload.refreshToken};`
          navigate('/')
        }
      })
  }

  if (user) {
    return (
      <Navigate to="/" replace />
    );
  }
  
  return (
    <>
      <form>
        <Entrance title='Вход' buttonText='Войти' onSubmit={handleSubmit} >
          <EmailInput
            {...email}
            name={'email'}
            isIcon={false}
            extraClass="mb-6"
          />
          <PasswordInput
            {...password}
            name={'password'}
            extraClass="mb-6"
          />
        </Entrance> 
      </form>
      <EntranceNavigation 
        text='Вы — новый пользователь?' 
        link='/register'
        linkText='Зарегистрироваться' 
        secondText='Забыли пароль?' 
        secondLink='/forgot-password' 
        secondLinkText='Восстановить пароль'  
        />
    </>
  );
};

export default Login;