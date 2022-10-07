require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// * 1 require ws
const ws = require('ws');
// * 4 подключение path и статики
const path = require('path');

const session = require('express-session');

const FileStore = require('session-file-store')(session);

const dbConnectionCheck = require('../db/dbConnectCheck');

const { PORT, SESSION_SECRET_DIMA } = process.env;

const renderTemplate = require('./lib/renderTemplate');

const app = express();
dbConnectionCheck();

const indexRoutes = require('./routes/indexRoutes');
const loginRoutes = require('./routes/loginRoutes');
const regRoutes = require('./routes/regRoutes');
const Chat = require('./views/Chat');

app.use(morgan('dev'));

// * 4.1 подключение статики
// * 5 см. в chat.js
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  name: 'OwlCookie', // * Название куки
  store: new FileStore(), // * подключение стора (БД для куки) для хранения
  secret: SESSION_SECRET_DIMA ?? 'shamil', // * ключ для шифрования куки
  resave: false, // * если true, пересохраняет сессию, даже если она не поменялась
  saveUninitialized: false, // * Если false, куки появляются только при установке req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10, // * время жизни в ms (10 дней)
    httpOnly: true, // * куки только по http
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.get('/chat', (req, res) => {
  renderTemplate(Chat, null, res);
});

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/register', regRoutes);

app.get('/logout', async (req, res) => {
  try {
    if (req.session.newUser) {
      req.session.destroy(() => {
        res.clearCookie('OwlCookie');
        res.redirect('/');
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
});

// * 2 - Присвоение подключения к переменной
const httpServer = app.listen(PORT ?? 3100, () => {
  console.log('Сервер запущен!');
});

// * 3 Создать сервер на вебсокетах, указывая что им будет являться
const wsServer = new ws.WebSocketServer({ server: httpServer });

// * 7 EventEmitter - это аналог eventListener'a только на сервере
wsServer.on('connection', (client) => {
  // * 16 Количество клиентов в чате
  console.log('Количество клиентов:', wsServer.clients.size);
  client.on('message', (data) => {
    // * 8 раскодировать пришедшее с клиента сообщение
    // * 17 распарсить пришедшее с клиента сообщение
    const utfData = JSON.parse(data.toString('utf8'));
    // * 17.1 создаём новый ключ в utfData и передаём туда количество подключенных юзеров
    utfData.clientsSize = wsServer.clients.size;
    console.log(utfData);
    // * 18 отправляем готовый объект в виде строки на клиент
    // * 19 отправка сообщения ОТ конкретного клиента
    wsServer.clients.forEach((currentClient) => {
      currentClient.send(JSON.stringify(utfData));
    });
    // * 20 см. в chat.js
    // * 9 cм. в chat.js
  });
});
