import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={styles.appHeaderContainer}>
            <div className={styles.logo}>
                <a href='#' className='mr-8'>
                    <div className='mr-2'>
                        <BurgerIcon type="primary" />
                    </div>
                    <p className="text text_type_main-default">Конструктор</p>
                </a>
                <a href="#">
                    <div className='mr-2'>
                        <ListIcon className='mr-2' type="secondary" />
                    </div>
                    <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
                </a>
            </div>
            <a href="#">
                <Logo/>
            </a>
            <a href="#">
                <div className='mr-2'>
                    <ProfileIcon className='mr-2' type="secondary" />
                </div>
                <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
            </a>
        </header>
    );
};

export default AppHeader;