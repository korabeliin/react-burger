import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';
import { Link } from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className={styles.appHeaderContainer}>
            <div className={styles.logo}>
                <Link to='/' className='mr-8'>
                    <div className='mr-2'>
                        <BurgerIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">Конструктор</p>
                </Link>
                <Link to='/orders'>
                    <div className='mr-2'>
                        <ListIcon className='mr-2' type="secondary" />
                    </div>
                    <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                </Link>
            </div>
            <Link to='/' >
                <Logo/>
            </Link>
            <Link to='/profile'>
                <div className='mr-2'>
                    <ProfileIcon className='mr-2' type="secondary" />
                </div>
                <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </Link>
        </header>
    );
};

export default AppHeader;