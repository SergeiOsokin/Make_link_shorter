import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LinksPage } from './pages/LinksPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { AuthPage } from './pages/AuthPage';


export const useRoutes = (isAuth) => {
    if (isAuth) {
        return ( // если пользователь прошел авторизацию, ему доступны ссылки ниже
            //<Redirect to='/create' /> будет всегда перекидывать на данную страницу, если адрес не /links или /detail/:id и т/д
            <Switch>
                <Route path='/links'>
                    <LinksPage />
                </Route>
                <Route path='/create'>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage />
                </Route>
                <Redirect to='/create' />
            </Switch>
        )
    }

    return ( // если неавторизованный пользователь попадаем на <AuthPage /> или если  указываем неверный путь/роут попадаем на <Redirect to='/' />
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
};