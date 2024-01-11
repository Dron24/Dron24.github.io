import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './../../AuthContext';
import './HeaderFix.css'
import st from './Header.module.css';
import Logo from '../Logo/Logo';
import Registration from '../Auth/Registration/Registration';
import Login from '../Auth/Login/Login'; // Импортируйте компонент Login

function Header(_props, ref) {
  // eslint-disable-next-line
  const { isAuthenticated, setIsAuthenticated, logout } = useContext(AuthContext);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Добавьте состояние для попапа входа
  const navigate = useNavigate();

  const toggleRegPopup = () => {
    setIsRegOpen(!isRegOpen);
  };

  const toggleLoginPopup = () => { // Функция для открытия и закрытия попапа входа
    setIsLoginOpen(!isLoginOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={st.header} id='header' ref={ref}>
      <div className={st.headerBox}>
        <div className={st.item}>
          <Link to="/"><Logo /></Link>
        </div>
        <div className={st.item}>
          Пустой бокс
        </div>
        <div className={st.item}>
          {isAuthenticated ? (
            <>
              <Link to="/user" className={st.btnReg}>Профиль</Link>
              <button onClick={handleLogout} className={st.btnReg}>Выйти</button>
            </>
          ) : (
            <>
              <button className={st.btnReg} onClick={toggleRegPopup}>Регистрация</button>
              {isRegOpen && (
                <Registration isOpen={isRegOpen} togglePopup={toggleRegPopup} />
              )}
              <button className={st.btnReg} onClick={toggleLoginPopup}>Войти</button> {/* Кнопка входа */}
              {isLoginOpen && (
                <Login isOpen={isLoginOpen} togglePopup={toggleLoginPopup} /> // Попап входа
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line
Header = React.forwardRef(Header);

export default Header;