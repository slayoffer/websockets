const renderTemplate = require('../lib/renderTemplate');
const Home = require('../views/Home');
const Secret = require('../views/Secret');

const renderHome = (req, res) => {
  // * 9 Достаём из сессии нашего пользователя если он есть
  const newUser = req.session?.newUser;
  // * 9.1 передача пользователя в пропсы
  // * 10 смотри в Home.jsx
  renderTemplate(Home, { newUser }, res);
};

const renderSecter = (req, res) => {
  renderTemplate(Secret, null, res);
}

module.exports = { renderHome, renderSecter };
