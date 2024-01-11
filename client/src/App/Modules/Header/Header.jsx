import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './../../AuthContext';
import './HeaderFix.css'
import st from './Header.module.css';
import Logo from '../Logo/Logo';
import Registration from '../Registration/Registration';

function Header(_props, ref) {
  // eslint-disable-next-line
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
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
            <Link to="/user" className={st.btnReg}>Профиль</Link> // Если пользователь авторизован, показываем ссылку на профиль
          ) : (
            <>
              <button className={st.btnReg} onClick={togglePopup}>Регистрация</button>
              {isOpen && (
                <Registration isOpen={isOpen} togglePopup={togglePopup} />
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