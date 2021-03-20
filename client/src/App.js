import React from 'react';
import { useRoutes } from './routes';
import { BrowserRouter as Router } from 'react-router-dom'; // чтобы можно было использовать роутинг
import { useAuth } from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import 'materialize-css'
import { Navbar } from './components/navbar';
import { Loader } from './components/loader';
// если хотим использовать контекст во всем приложении нужно оборачивать его в AuthContext.Provider
// для использования роутинга нужно оборачивать приложение в Router
// {isAuth && <Navbar />}  если авторизован показываем меню
function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuth = !!token; //приводим к bool
  const routes = useRoutes(isAuth)

  if(!ready) { // проверяем, что авторизация прошла
    return (<Loader />)
  }

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuth}}>
      <Router>
        {isAuth && <Navbar />} 
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
