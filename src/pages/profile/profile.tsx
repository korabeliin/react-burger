import { useState, useEffect, useRef, SetStateAction } from 'react';
import {Input, EmailInput, PasswordInput, EditIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest, updateUserData } from '../../utils/asyncFunctions';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import getCookie from '../../utils/getCookie';
import setCookie from '../../utils/setCookie';
import {TResponse} from "../../utils/types";

const Profile = () => {

  const { user, password, accessToken } = useSelector((store:any) => store.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      setName(user?.name || '')
      setEmail(user?.email || '')
      setPasswordInput(password || '')
    }
  }, [])

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordInput] = useState('');


  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value)
  }

  const handleUserDataUpdate = () => {
    const userInfo = {
      "user": {
        "email": email,
        "name": name,
        "password": passwordInput
      },
      "token": accessToken
    }
    dispatch(updateUserData(userInfo));
  }

  const cancelChanges = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setPasswordInput(password || '')
  }

  const handleLogout = () => {
    const token = getCookie('token');
      const body = {"token": token}
      dispatch(logoutRequest(body))
        .then((res: TResponse) => {
        if (res.payload.success) {
          setCookie('token', '')
          navigate('/login')
        }
      })
  }

  const activeClasses = 'text text_type_main-medium';
  const inactiveClasses = 'text text_type_main-medium text_color_inactive';
  const [isDisabled, setIsDisabled] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setTimeout(() => inputRef.current?.focus(), 0)
    setIsDisabled(false)
  }

  const handleStopEditing = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsDisabled(true);
    inputRef.current?.blur();
  }

  return (  
    <>
      <section onClick={e => handleStopEditing(e)} className={`${styles.profile} mt-20`}>
        <div className={`${styles.profileLinksContainer} mr-10`}>
          <div className={`${styles.profileLinks} mr-10`}>
            <NavLink 
              to='/profile' 
              end
              className={({ isActive }) => isActive ? `${activeClasses} mb-8` : `${inactiveClasses} mb-8`}>
              ??????????????
            </NavLink>
            <NavLink 
              to='/profile/orders' 
              end
              className={({ isActive }) => isActive ? `${activeClasses} mb-8` : `${inactiveClasses} mb-8`}>
              ?????????????? ??????????????
            </NavLink>
            <NavLink 
              to='/login' 
              end
              onClick={handleLogout}
              className={({ isActive }) => isActive ? `${activeClasses} mb-12` : `${inactiveClasses} mb-12`}>
              ??????????
            </NavLink>
          </div>
          
          <p className="text text_type_main-default text_color_inactive mt-10">?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????</p>
        </div>
        
        <div className={styles.profileInputsContainer}>
        <div className={styles.plainInput}>
          <Input
            value={name}
            onChange={onNameChange}
            type={'text'}
            name={'name'}
            placeholder='??????'
            extraClass="mb-6"
            ref={inputRef}
            disabled={isDisabled}
          />
          <div onClick={e => handleEditClick(e)} className={styles.editIcon}><EditIcon type="primary" /></div>
        </div>
          <EmailInput
            value={email}
            onChange={onEmailChange}
            name={'email'}
            extraClass="mb-6"
            isIcon={true}
            placeholder='??????????'
          />
          <PasswordInput
            value={passwordInput}
            onChange={onPasswordChange}
            name={'password'}
            icon="EditIcon"
            placeholder='????????????'
          />
          <div>
            <Button onClick={cancelChanges} htmlType="button" type="secondary" size="medium">
              ????????????
            </Button>
            <Button onClick={handleUserDataUpdate} htmlType="button" type="primary" size="medium" extraClass='mt-10'>
              ??????????????????
            </Button>
          </div>

          <Outlet />
        </div>
      </section>
    </>
  );
};

export default Profile;