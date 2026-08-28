import { login, setToken, setName } from './api.js';
import { renderRegistration } from './rendeRegistration.js';

export const renderLogin = () => {
  const container = document.querySelector('.container');
  if (!container) return;

  const loginHtml = `
    <section class="add-form">
      <h1>Форма входа</h1>
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
        <button class="add-form-button-main" type="button" id="login-submit">
          Войти
        </button>
        <span class="add-form-button-link" id="to-register">Зарегистрироваться</span>
      </fieldset>
    </section>
  `;

  container.innerHTML = loginHtml;

  // Кнопка «Зарегистрироваться» → форма регистрации
  document.getElementById('to-register').addEventListener('click', () => {
    renderRegistration();
  });

  // Кнопка «Войти»
  const submitBtn = document.getElementById('login-submit');

  submitBtn.addEventListener('click', () => {
    const loginEl = document.getElementById('login-input');
    const passwordEl = document.getElementById('password-input');

    const loginValue = loginEl.value.trim();
    const passwordValue = passwordEl.value.trim();

    if (!loginValue || !passwordValue) {
      alert('Введите логин и пароль');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Входим...';

    login(loginValue, passwordValue)
      .then((data) => {
        setToken(data.user.token);
        setName(data.user.name);
       
        window.location.reload();
      })
      .catch((error) => {
        alert(error.message || 'Ошибка входа. Проверьте логин и пароль.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Войти';
      });
  });
};
