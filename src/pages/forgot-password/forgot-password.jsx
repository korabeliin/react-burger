import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from './../../hooks/useInput';
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendCode } from '../../utils/asyncFunctions';

const ForgotPassword = () => {

  const {user} = useSelector(store => store.user);

  const email = useInput('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const body = {"email" : email.value}

  const handleSubmit = () => {
    dispatch(sendCode(body))
      .then(res => {
        if(res.payload.success) {
          navigate('/reset-password')
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
        <Entrance title='Восстановление пароля' buttonText='Восстановить' onSubmit={handleSubmit} >
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