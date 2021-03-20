// чтобы передавать контекст по всему приложению
import { createContext } from 'react';

function nullMy () {}; 

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: nullMy,
    logout: nullMy,
    isAuth: false
});