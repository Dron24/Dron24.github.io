import React, { useState } from 'react';
import stl from './Registration.module.css';

function Registration() {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      // Здесь вы можете отправить данные формы на сервер
      console.log(`First Name: ${firstName}, Last Name: ${lastName}, Middle Name: ${middleName}, Email: ${email}, Phone Number: ${phoneNumber}, Password: ${password}`);
    };

    const isSubmitEnabled = email && phoneNumber && password && password === confirmPassword;

  return (
    <div className={stl.regBox}>
      <h1>Регистрация Пользователя</h1>
      <form onSubmit={handleSubmit} className={stl.regForm}>
          <input type="text" placeholder='Имя' value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <input type="text" placeholder='Фамилия' value={lastName} onChange={e => setLastName(e.target.value)} required />
          <input type="text" placeholder='Отчество' value={middleName} onChange={e => setMiddleName(e.target.value)} required />
          <input type="email" placeholder='Email:' value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="tel" placeholder='Телефон' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
          <input type="password" placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" placeholder='Повторите Пароль' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
        <button type="submit" disabled={!isSubmitEnabled}>Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;