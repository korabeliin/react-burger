import React, {useEffect} from 'react';
import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from './../../hooks/useInput';
import {Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../utils/asyncFunctions';

const Register = () => {

  const name = useInput('');
  const email = useInput('');
  const password = useInput('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const body = {
    "name" : name.value,
    "email" : email.value,
    "password" : password.value
  }

  const handleSubmit = () => {
    dispatch(createUser(body))
      .then(res => {
        if(res.payload.success) {
          navigate('/login')
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
        <Entrance title='Регистрация' buttonText='Зарегистрироваться' onSubmit={handleSubmit}>
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