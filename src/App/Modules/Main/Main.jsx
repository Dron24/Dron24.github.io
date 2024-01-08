import React from 'react';
import stl from './Main.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './../../Pages/Home/Home';
import AboutPage from './../../Pages/About/About';
import UserProfile from './../../Pages/UserProfile/UserProfile';
import Registration from '../../Pages/Registration/Registration';

function Main(props) {
  const { headerHeight } = props;
  return (
    <div className={stl.main} id='mainTop' style={{ paddingTop: headerHeight }}>
      <div className={stl.mainBox}>
            <nav>
              <ul>
                <li>
                  <Link to="/">Главная Страница</Link>
                </li>
                <li>
                  <Link to="/about">О Нас</Link>
                </li>
                <li>
                  <Link to="/registration">Регистрация</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
      </div>
    </div>
  );
}

export default Main;
