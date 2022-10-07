// * 5 Создать новый WebSocket и заменим подключение http на ws
const ws = new WebSocket(window.location.href.replace(/^http/, 'ws'));
// console.log('Hi!', ws);

// * 6 открыть соединение на фронте и передать сообщение на бек
// * 6.1 Выделяем форму и после открытия соединения делаем кнопку активной
const { chatForm } = document.forms;

// ws.onopen = () => {
//   chatForm.chatBtn.disabled = false;
//   ws.send('Привет с фронта');
// };

// * 7 см. в app.js

// * 9 делаем отлов сообщений с сервера
// ws.onmessage = (event) => {
//   console.log(event.data);
// };
// ! Новое соединение
// * 10 делаем чат
// * 10.1 выделяем див для чата, чтобы добавлять в него сообщения
const chatDiv = document.querySelector('#chatDiv');
// * 10.2 выделяем h2 для просмотра юзеров в чате
const users = document.querySelector('#users');

// * 11 Новое соединение с вебсокетами и чатом
ws.onopen = () => {
  chatForm.chatBtn.disabled = false;
};

// * 12 обработчик формы
// * 13 цветные сообщения
// ! Цвет Нужно вынести за пределы addEventListener, чтобы он не менялся при клике у одного и того же клиента
const color = `#${(`${Math.random().toString(16)}000000`).substring(2, 8).toUpperCase()}`;

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const { value } = event.target.chatInp;
  console.log(value);
  // * 14 подготовка сообщения к отправке на сервер
  const myMessage = JSON.stringify({ value, color });
  // * 15 ws.send на сервер
  ws.send(myMessage);
});
// * 16 см. в app.js

// * 20 ws.onmessage принимаем сообщение с сервера
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
  // * 21 создание новой html вёрстки
  const str = document.createElement('h3');
  str.innerText = data.value;
  str.style.color = data.color;
  chatDiv.appendChild(str);
  // * 22 меняем количество вошедших юзеров
  users.innerText = `Количество юзеров в чате: ${data.clientsSize}`;
};
