import React from 'react';
import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from './../../hooks/useInput';
import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const ResetPassword = () => {

  const password = useInput('');
  const code = useInput('');

  return (
    <>
      <form>
        <Entrance title='Восстановление пароля' buttonText='Сохранить' >
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