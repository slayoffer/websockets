const React = require('react');

const Layout = require('./Layout');

module.exports = function Home({ newUser }) {
  // * 10 Использование пропса newUser в вёрстке
  // * 11 передавать пропс в Layout
  // * 12 зайди в Layout
  return (
    <Layout newUser={newUser}>
      <h1>
        Hello user!
        {' '}
        { newUser }
      </h1>
    </Layout>
  );
};
