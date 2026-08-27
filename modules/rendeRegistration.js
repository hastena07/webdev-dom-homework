import { registration, setToken, setName } from './api.js';
import { renderLogin } from './renderLogin.js';

export const renderRegistration = () => {
  const container = document.querySelector('.container');
  if (!container) return;

  const regHtml = `
    <section class="add-form">
      <h1>Форма регистрации</h1>
      <input
        type="text"
        class="add-form-name"
        id="name-input"
        placeholder="Введите имя"
        required
      />
      <input
        type="text"
        class="add-form-name"
        id="login-input"
        placeholder="Введите логин"
        required
      />
      <input
        type="password"
        class="add-form-name"
        id="password-input"
        placeholder="Введите пароль"
        required
      />
      <fieldset class="add-form-registry">
        <button class="add-form-button-main" type="button" id="reg-submit">
          Зарегистрироваться
        </button>
        <span class="add-form-button-link" id="to-login">Войти</span>
      </fieldset>
    </section>
  `;

  container.innerHTML = regHtml;

  // Кнопка «Войти» → форма входа
  document.getElementById('to-login').addEventListener('click', () => {
    renderLogin();
  });

  // Кнопка «Зарегистрироваться»
  const submitBtn = document.getElementById('reg-submit');

  submitBtn.addEventListener('click', () => {
    const nameEl = document.getElementById('name-input');
    const loginEl = document.getElementById('login-input');
    const passwordEl = document.getElementById('password-input');

    const nameValue = nameEl.value.trim();
    const loginValue = loginEl.value.trim();
    const passwordValue = passwordEl.value.trim();

    if (!nameValue || !loginValue || !passwordValue) {
      alert('Заполните все поля');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Регистрация...';

    registration(nameValue, loginValue, passwordValue)
      .then((data) => {
        setToken(data.user.token);
        setName(data.user.name);
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message || 'Ошибка регистрации. Попробуйте позже.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Зарегистрироваться';
      });
  });
};
