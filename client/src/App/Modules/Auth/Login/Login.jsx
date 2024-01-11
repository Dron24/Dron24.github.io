import React, { useState, useContext } from 'react';
import AuthContext from '../../../AuthContext';
import stl from './../Auth.module.css';
import axios from 'axios';

function Login(props) {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { togglePopup } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/login', { email, password })
      .then(response => {
        console.log(response);
        setIsAuthenticated(true); // Устанавливаем isAuthenticated в true после успешной авторизации
        togglePopup();
      })
      .catch(error => {
        console.log(error);
      });
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const isSubmitEnabled = email && password;

  return (
    <div className={stl.AuthBox}>
      <h1>Авторизация Пользователя</h1>
      <button className={stl.close} onClick={togglePopup}></button>
      <form onSubmit={handleSubmit} className={stl.AuthForm} autoComplete="off">
        <input type="email" autoComplete="off" placeholder='Email:' value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" autoComplete="new-password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" disabled={!isSubmitEnabled}>Войти</button>
      </form>
      <ul className={stl.circles}><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    </div>
  );
}

export default Login;