import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from '../../hooks/useInput';
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../utils/asyncFunctions';
import setCookie from '../../utils/setCookie';
import {TResponse} from "../../utils/types";

const Login = () => {

  const email = useInput('');
  const password = useInput('');
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(location)

  const { user } = useSelector((store:any) => store.user);

  const body = {
    "email" : email.value,
    "password" : password.value
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginRequest(body))
      .then((res: TResponse) => {
        if (res.payload.success && res.payload.refreshToken) {
          setCookie('token', res.payload.refreshToken);
        }
      })
  }

  if (user) {
    return (
      <Navigate to={location?.state?.from.pathname || '/'} />
    );
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Entrance title='Вход' buttonText='Войти' >
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