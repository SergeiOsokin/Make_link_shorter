import React, { useContext, useEffect, useState } from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () => {
    const auth = useContext(AuthContext); // получаем контекст в объекте auth
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    // хуки. Устанавливаем соостояние и функцию, которая будет менять это состояние
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    // следим за ошибкой. Зависимости указываются в [error, message, clearError]
    useEffect(() => { 
        message(error);
        clearError(); // очищаем ошибку (сделали в http.hook)
    }, [error, message, clearError]);
    // объект M подключился вместе с import 'materialize-css', window.M.updateTextFields(); - позволяет делать поля формы активными
    useEffect(() => {
        window.M.updateTextFields();
    });
    // уставливаем значение полям при вводе в инпута. Меняем состояние
    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    //
    const registrHandler = async () => {
        try {
           const data = await request('/api/auth/register', 'POST', form); // в form находится email и password
           message(data.message); // покажем пользователю, что он зарегистрирован
        } catch(e) {}
    };
    const loginHandler = async () => {
        try {
           const data = await request('/api/auth/login', 'POST', form, {
                "Content-Type": "application/json"
           }); // в form находится email и password
           auth.login(data.token, data.userId);
        } catch(e) {}
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="Введите email" name="email" onChange={changeHandler} className="validate" value={form.email} />

                            </div>
                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" placeholder="Введите пароль" name="password" onChange={changeHandler} value={form.password} />

                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4 btn_enter" onClick={loginHandler} disabled={loading}>Войти</button>
                        <button 
                        className="btn gray lighten-1 black-text" 
                        onClick={registrHandler}
                        disabled={loading} //в зависимости от того, выполняется запрос или уже нет, блокируем кнопку. Сделали в /hooks/http.hook
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
};