import React from 'react';
import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from './../../hooks/useInput';
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";

const ForgotPassword = () => {

  const email = useInput('');

  return (
    <>
      <form>
        <Entrance title='Восстановление пароля' buttonText='Восстановить' >
          <EmailInput
            {...email}
            name={'email'}
            isIcon={false}
            extraClass="mb-6"
            placeholder='Укажите e-mail'
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

export default ForgotPassword;