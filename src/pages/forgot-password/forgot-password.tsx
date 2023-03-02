import EntranceNavigation from '../../components/entrance-navigation/entrance-navigation';
import Entrance from '../../components/entrance/entrance';
import { useInput } from '../../hooks/useInput';
import {EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendCode } from '../../utils/asyncFunctions';

type TResponse = {
  payload: { success: boolean; };
}

const ForgotPassword = () => {

  const {user} = useSelector((store: any) => store.user);

  const email = useInput('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const body = {"email" : email.value}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendCode(body))
      .then((res: TResponse) => {
        console.log(res)
        if(res.payload.success) {
          navigate('/reset-password', {state: { from: location }})
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
        <Entrance title='Восстановление пароля' buttonText='Восстановить'>
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