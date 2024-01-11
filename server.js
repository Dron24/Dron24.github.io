// Подключаем модуль dotenv для работы с переменными окружения
require('dotenv').config();

// Подключаем необходимые модули
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Создаем экземпляр Express-приложения
const app = express();

// Подключаем модули sequelize (ORM для работы с SQL базами данных), argon2 (для хеширования паролей) и jsonwebtoken (для создания JWT)
const { Sequelize, DataTypes } = require('sequelize');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Подключаем модуль path для работы с путями файлов
const path = require('path');

// Настраиваем middleware для работы с CORS и JSON-телами запросов
app.use(cors({
  origin: 'carlee.ru' // Замените на ваш домен
}));
app.use(bodyParser.json());

// Создаем экземпляр Sequelize для подключения к базе данных
const sequelize = new Sequelize('dron24_24', 'dron24_24', '11111', {
  host: 'nice.carlee.ru',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Проверяем подключение к базе данных
sequelize.authenticate()
  .then(() => {
    console.log('Подключение к базе данных успешно установлено');
  })
  .catch(err => {
    console.error('Ошибка подключения к базе данных: ', err.stack);
  });

// Определяем модель User для работы с таблицей users в базе данных
const User = sequelize.define('users', {
  // Определение полей модели
  nicName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true, // Sequelize автоматически добавит поля createdAt и updatedAt
});

// Синхронизируем модель User с базой данных
User.sync({ alter: true })
  .then(() => console.log('Table updated'))
  .catch(error => console.error('Error updating table: ', error));

// Обработчик GET-запроса на получение всех пользователей
app.get('/data', (req, res) => {
  User.findAll()
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      console.error('Ошибка выполнения запроса: ' + error.stack);
    });
});

// Обработчик POST-запроса на регистрацию пользователя
app.post('/register', async (req, res) => {
  const { nicName, phoneNumber, email, firstName, lastName, middleName, password } = req.body;

  // Проверка входных данных
  if (!nicName || !phoneNumber || !email || !firstName || !lastName || !middleName || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'A user with this email already exists.' });
    }

    const hashedPassword = await argon2.hash(password); // Измените эту строку

    const newUser = await User.create({
      nicName,
      phoneNumber,
      email,
      firstName,
      lastName,
      middleName,
      password: hashedPassword // Сохранение хешированного пароля
    });

    res.json({
      data: newUser,
      message: 'User successfully registered.'
    });
  } catch (error) {
    console.error('Error while registering user: ', error);
    res.status(500).json({ error: error.message });
  }
});

// Обработчик POST-запроса на вход пользователя в систему
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      data: {
        token
      },
      message: 'User successfully logged in.'
    });
  } catch (error) {
    console.error('Error while logging in user: ', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Код для обслуживания статических файлов из папки build и возврата index.html для любых неизвестных маршрутов
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// Запускаем сервер на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
