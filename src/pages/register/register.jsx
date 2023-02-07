import React from 'react';
import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from './../../hooks/useInput';
import {Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";

const Register = () => {

  const name = useInput('');
  const email = useInput('');
  const password = useInput('');

  return (
    <>
      <form>
        <Entrance title='Регистрация' buttonText='Зарегистрироваться' >
          <Input
            {...name}
            type={'text'}
            name={'name'}
            placeholder='Имя'
            isIcon={false}
            extraClass="mb-6"
          />
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
        text='Уже зарегистрированы?' 
        link='/login'
        linkText='Войти'
        /> 
    </>
  );
};

export default Register;