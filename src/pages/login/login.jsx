import React from 'react';
import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from './../../hooks/useInput';
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const Login = () => {

  const email = useInput('');
  const password = useInput('');
  
  return (
    <>
      <form>
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