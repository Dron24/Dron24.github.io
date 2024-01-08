const express = require('express');
const mysql = require('mysql');

// Создание подключения к базе данных
const db = mysql.createConnection({
  host: 'www.nice.carlee.ru',
  user: 'dron24',
  password: '235689',
  database: 'dron24_24'
});

// Подключение к базе данных
db.connect((error) => {
  if (error) {
    console.error('Ошибка подключения к базе данных:', error);
  } else {
    console.log('Подключение к базе данных успешно установлено');
  }
});

// Создание экземпляра Express.js
const app = express();

// Обработка запросов на маршруте /api/data
app.get('/api/data', (req, res) => {
  // Выполнение запроса к базе данных
  db.query('SELECT * FROM table_name', (error, results) => {
    if (error) {
      console.error('Ошибка выполнения запроса:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Запуск сервера
const port = 3011;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
