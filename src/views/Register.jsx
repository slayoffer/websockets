const React = require('react');

const Layout = require('./Layout');

module.exports = function Login() {
  return (
    <Layout>
      <h2>Зарегистрируйтесь</h2>
      <hr />
      <script defer src="js/posts.js" />
      <form action="/register" method="POST" id="loginForm">
        <label htmlFor="exampleInput1" className="form-label">Login</label>
        <input name="login" type="text" className="form-control" id="exampleInput1" />
        <label htmlFor="exampleInput2" className="form-label">Password</label>
        <input name="password" type="text" className="form-control" id="exampleInput2" />
        <button type="submit" className="btn btn-primary">Отправить</button>
      </form>
      <hr />
    </Layout>
  );
};
