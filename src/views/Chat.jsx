const React = require('react');

const Layout = require('./Layout');

module.exports = function Login() {
  return (
    <Layout>
      <script defer src="/js/chat.js" />
      <h2 id="users">Количество юзеров в чате: 0</h2>
      <hr />
      <form name="chatForm" className="d-flex">
        <label htmlFor="exampleInput1" className="form-label">Введите сообщение</label>
        <input name="chatInp" type="text" className="form-control" id="exampleInput1" />
        <button name="chatBtn" type="submit" className="btn btn-primary" disabled>Отправить</button>
      </form>
      <hr />
      <div id="chatDiv" />
    </Layout>
  );
};
