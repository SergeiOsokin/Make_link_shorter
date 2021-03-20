// работа с залогиненными пользователями
import {useCallback, useState, useEffect} from 'react';

const storageName = 'userData';
export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUSerId] = useState(null);
    const [ready, setReady] = useState(false); // для "модуля" авторизации
    // что происходит после успешной авторизации
    const login = useCallback( (jwtToken, id) => {
        setToken(jwtToken); // записываем токен в token
        setUSerId(id);// записываем айди пользователя в userId
        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId:id 
        })); // сохраняем данные авторизации в локальном хранилище
    }, []);
    // что делаем при разлогинивании
    const logout = useCallback( () => {
        setToken(null); // очищаем
        setUSerId(null);// очищаем
        localStorage.removeItem(storageName);
    }, []);

    // проверим, нет ли данных в локальном хранилище сейчас, чтобы сделать пользвателя авторизованным. 
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName)); // незабывать приводить данные из хранилища к объекту JSON.parce
        if(data && data.token) {
            login(data.token, data.userId);
        }
        setReady(true); // говорим? что модуль авторизации отработал
    }, [login])

    return {
        login,
        logout,
        token,
        userId,
        ready
    };
};