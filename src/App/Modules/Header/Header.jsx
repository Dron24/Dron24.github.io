import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderFix.css'
import st from './Header.module.css';
import Logo from '../Logo/Logo';

function Header(_props, ref) {
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
          <Link to="/user">Профиль</Link>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line
Header = React.forwardRef(Header);

export default Header;