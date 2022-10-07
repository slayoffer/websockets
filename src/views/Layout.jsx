const React = require('react');

module.exports = function Layout({ children, newUser }) {
  // * 13 приняли пропс newUser
  // * 14 Делаем условную вёрстку и показываем либо: войти/зарегистрировать
  // * имя пользователя/выйти
  // * 15 см в regControllers
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
          crossOrigin="anonymous"
        />
        <title>Document</title>
      </head>
      <header>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            { newUser ? (
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <div className="nav-link">
                      Привет,
                      {' '}
                      { newUser }
                      {' '}
                      !
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout">Выйти!</a>
                  </li>
                  {newUser === 'Abob' ? (
                    <li className="nav-item">
                      <a className="nav-link" href="/secret">Secret!</a>
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>
            )
              : (
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/register">Registration</a>
                    </li>
                  </ul>
                </div>
              )}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/chat">Chat</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <body>
        { children }
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous" />
      </body>
    </html>
  );
};
