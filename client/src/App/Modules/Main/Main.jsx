import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from '../../Pages/Home';
import AboutPage from '../../Pages/About';
import UserProfile from '../../Pages/UserProfile';

import stl from './Main.module.css';

function Main(props) {
  const { headerHeight } = props;
  return (
    <div className={stl.main} id='mainTop' style={{ paddingTop: headerHeight }}>
      <div className={stl.mainBox}>
            <Routes>
              <Route path="/about" element={<AboutPage />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
      </div>
    </div>
  );
}

export default Main;