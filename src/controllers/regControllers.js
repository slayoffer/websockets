// * 17 require bcrypt
const bcrypt = require('bcrypt');

const renderTemplate = require('../lib/renderTemplate');
const Register = require('../views/Register');

const { User } = require('../../db/models');

const renderRegister = (req, res) => {
  renderTemplate(Register, null, res);
};

const regUser = async (req, res) => {
  const { login, password } = req.body;
  try {
    // ! 16 Хеширование паролей, чтобы они не записывались в первозданном виде в бд
    // * 18 делаем новую переменную с хешированным паролем
    // * 19 см в app.js
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ login, password: hash });
    // * 8 создание сессии относительно нового юзера
    // * 8.1 После создания  req.session.newUser у нас появилась папка
    // * session в которой находятся данные о нашем пользователе
    // * 9 смотри indexControllers
    req.session.newUser = newUser.login;
    // * 15 обработка ошибки в консоли
    // ! Если не написать, то redirect может происходить раньше, чем записаь файла в session
    req.session.save(() => {
      res.redirect('/');
    });
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
};

module.exports = { renderRegister, regUser };
