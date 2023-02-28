import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';

const AppHeader = () => {

    const activeClasses = 'text text_type_main-medium';
    const inactiveClasses = 'text text_type_main-medium text_color_inactive';
    const location = useLocation();

    return (
        <header className={styles.appHeaderContainer}>
            <div className={styles.logo}>
                <NavLink 
                    end 
                    to='/' 
                    className={({ isActive }) => isActive ? `${activeClasses} mr-8` : `${inactiveClasses} mr-8`}
                    >
                    <div className='mr-2'>
                        <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
                    </div>
                    <p className="text text_type_main-default">Конструктор</p>
                </NavLink>
                <NavLink 
                    end 
                    to='/orders' 
                    className={({ isActive }) => isActive ? `${activeClasses} mr-8` : `${inactiveClasses} mr-8`}
                    >
                    <div className='mr-2'>
                        <ListIcon 
                            type={location.pathname === '/orders' ? 'primary' : 'secondary'} />
                    </div>
                    <p className="text text_type_main-default">Лента заказов</p>
                </NavLink>
            </div>
            <NavLink end to='/'>
                <Logo/>
            </NavLink>
            <NavLink 
                end 
                to='/profile' 
                className={({ isActive }) => isActive ? `${activeClasses} mr-8` : `${inactiveClasses} mr-8`}
                >
                <div className='mr-2'>
                    <ProfileIcon 
                        type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
                </div>
                <p className="text text_type_main-default">Личный кабинет</p>
            </NavLink>
        </header>
    );
};

export default AppHeader;