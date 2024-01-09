const express = require('express');
const app = express();

const mysql = require('mysql2');

// Подключение к базе данных
const pool = mysql.createPool({
  host: 'nice.carlee.ru', // Адрес сервера базы данных
  user: 'dron24_24', // Имя пользователя базы данных
  password: '11111', // Пароль пользователя базы данных
  database: 'dron24_24', // Имя базы данных
  connectionLimit: 10 // Максимальное количество соединений в пуле
});

// Проверка подключения к базе данных
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Ошибка подключения к базе данных: ' + err.stack);
    return;
  }
  console.log('Подключение к базе данных успешно установлено');

  // Обработка запросов к базе данных
  app.get('/data', (req, res) => {
    connection.query('SELECT * FROM table_name', (error, results) => {
      if (error) {
        console.error('Ошибка выполнения запроса: ' + error.stack);
        return;
      }
      res.json(results);
    });
  });

  // Освобождение соединения после использования
  connection.release();
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
