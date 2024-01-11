const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Добавьте эту строку
const app = express();
const { Sequelize, DataTypes } = require('sequelize');

app.use(cors()); // И эту строку
app.use(bodyParser.json());

// Подключение к базе данных
const sequelize = new Sequelize('dron24_24', 'dron24_24', '11111', {
  host: 'nice.carlee.ru', // Адрес сервера базы данных
  dialect: 'mysql',
  pool: {
    max: 10, // Максимальное количество соединений в пуле
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Проверка подключения к базе данных
sequelize.authenticate()
  .then(() => {
    console.log('Подключение к базе данных успешно установлено');
  })
  .catch(err => {
    console.error('Ошибка подключения к базе данных: ', err.stack);
  });

// Определение модели
const User = sequelize.define('users', {
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

User.sync({ alter: true })
  .then(() => console.log('Table updated'))
  .catch(error => console.error('Error updating table: ', error));

// Обработка запросов к базе данных
app.get('/data', (req, res) => {
  User.findAll()
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      console.error('Ошибка выполнения запроса: ' + error.stack);
    });
});

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

    const newUser = await User.create({
      nicName,
      phoneNumber,
      email,
      firstName,
      lastName,
      middleName,
      password
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

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});