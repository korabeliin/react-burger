import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from '../../hooks/useInput';
import {Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../utils/asyncFunctions';
import {TResponse} from "../../utils/types";

const Register = () => {

  const name = useInput('');
  const email = useInput('');
  const password = useInput('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store:any) => store.user);

  const body = {
    "name" : name.value,
    "email" : email.value,
    "password" : password.value
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUser(body))
      .then((res:TResponse) => {
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
      <form onSubmit={handleSubmit}>
        <Entrance title='Регистрация' buttonText='Зарегистрироваться'>
          <Input
            {...name}
            type={'text'}
            name={'name'}
            placeholder='Имя'
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