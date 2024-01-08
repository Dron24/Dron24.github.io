import './App.css';
import React, { useRef, useEffect, useState } from 'react';
import Header from './Modules/Header/Header';
import Main from './Modules/Main/Main';
import Footer from './Modules/Footer/Footer';

function App() {
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
    <div className="App">
      {/* Передаем созданную ссылку в Header */}
      <Header ref={headerRef} />
      {/* Передаем высоту Header в Main */}
      <Main headerHeight={headerHeight} />
      <Footer/>
    </div>
  );
}

export default App;
