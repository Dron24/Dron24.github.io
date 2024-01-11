import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // импортируем useNavigate
import AuthContext from './AuthContext';
import axios from 'axios';


import Header from './Modules/Header/Header';
import Main from './Modules/Main/Main';
import Footer from './Modules/Footer/Footer';

import NaviFloat from './Modules/NaviFloat/NaviFloat';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // определяем состояние для текущего пользователя
  const navigate = useNavigate(); // инициализируем navigate

  const logout = () => {
    // Удалить токен доступа из localStorage
    localStorage.removeItem('accessToken');
  
    // Очистить глобальное состояние
    setIsAuthenticated(false);
    setCurrentUser(null);
  
    // Отправить запрос на сервер
    axios.post('/api/logout')
      .then(() => {
        // Перенаправить пользователя на страницу входа
        navigate('/login'); // используем navigate вместо history.push
      })
      .catch(error => {
        console.error('Error logging out: ', error);
      });
  };
  
  // Создаем ссылку на Header с помощью useRef
  const headerRef = useRef(null);
  // Инициализируем состояние для хранения высоты Header
  const [headerHeight, setHeaderHeight] = useState(0);

  // Используем useEffect для установки высоты Header после его монтирования
  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, currentUser, setCurrentUser }}>
      <div className="App">
        {/* Передаем созданную ссылку в Header */}
        <Header ref={headerRef} />
        {/* Передаем высоту Header в Main */}
        <Main headerHeight={headerHeight} />
        <Footer />

        <NaviFloat />
      </div>
    </AuthContext.Provider>
  );
}

export default App;