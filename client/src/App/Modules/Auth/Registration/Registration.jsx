import React, { useState, useContext } from 'react';
import AuthContext from '../../../AuthContext';
import stl from './../Auth.module.css';
import axios from 'axios';

function Registration(props) {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { togglePopup } = props;

  const [nicName, setnicName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/register', { nicName, phoneNumber, email, firstName, lastName, middleName, password })
      .then(response => {
        console.log(response);
        setIsAuthenticated(true); // Устанавливаем isAuthenticated в true после успешной регистрации
        togglePopup();
      })
      .catch(error => {
        console.log(error);
      });
    console.log(`First Name: ${firstName}, Last Name: ${lastName}, Middle Name: ${middleName}, Email: ${email}, Phone Number: ${phoneNumber}, Password: ${password}`);
  };

  const isSubmitEnabled = email && phoneNumber && password && password === confirmPassword;

  return (
    <div className={stl.AuthBox}>
      <h1>Регистрация Пользователя</h1>
      <button className={stl.close} onClick={togglePopup}></button>
      <form onSubmit={handleSubmit} className={stl.AuthForm} autoComplete="off">
        <input type="text" autoComplete="off" placeholder='Никнейм' value={nicName} onChange={e => setnicName(e.target.value)} required />
        <input type="tel" autoComplete="new-password" placeholder='Телефон' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
        <input type="email" autoComplete="off" placeholder='Email:' value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="text" autoComplete="off" placeholder='Имя' value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <input type="text" autoComplete="off" placeholder='Фамилия' value={lastName} onChange={e => setLastName(e.target.value)} required />
        <input type="text" autoComplete="off" placeholder='Отчество' value={middleName} onChange={e => setMiddleName(e.target.value)} required />
        <input type="password" autoComplete="new-password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="password" autoComplete="off" placeholder='Повторите Пароль' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <button type="submit" disabled={!isSubmitEnabled}>Зарегистрироваться</button>
      </form>
      <ul className={stl.circles}><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul>
    </div>
  );
}

export default Registration;