import {React, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {
    const auth = useContext(AuthContext); //получаем контекст, в данном случае нужна функция разлогина
    const history = useHistory(); // может использоваться для редиректа на определенную страницу

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };


    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span className="brand-logo">Сокращение ссылок</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать</NavLink></li> 
                    <li><NavLink to="/links">Мои ссылки</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav> 
    )
}