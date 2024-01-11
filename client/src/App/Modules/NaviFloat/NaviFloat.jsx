import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fl from './NaviFloat.module.css';

function NaviFloat() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseDown(e) {
    if (e.button !== 0) return; // Проверяем, что нажата левая кнопка мыши
    setIsDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function handleMouseUp() {
    if (!isDragging) return;
    setIsDragging(false);
  }

  return (
    <div
      className={fl.navi}
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Внутренний блок с ссылками не влияет на перемещение */}
      <nav className={fl.navig}>
        <Link to="/">Главная Страница</Link>
        <Link to="/about">О Нас</Link>
        <Link to="/user">Профильн</Link>
      </nav>
    </div>
  );
}

export default NaviFloat;