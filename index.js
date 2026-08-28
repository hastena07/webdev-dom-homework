import {
  loadCommentsList,
  postComment,
  token,
  name,
  clearAuth,
} from './modules/api.js';
import { commentsState, updateComments } from './modules/comments.js';
import { renderComments } from './modules/renderComments.js';
import { renderLogin } from './modules/renderLogin.js';
import { escapeHtml } from './modules/utils.js';

const commentsListEl = document.getElementById('comments-list');
const globalLoader = document.getElementById('global-loader');
const addFormContainer = document.getElementById('add-form-container');
const authArea = document.getElementById('auth-area');
const nameInput = document.getElementById('comment-name');
const textInput = document.getElementById('comment-text');
const submitBtn = document.getElementById('add-comment-btn');
const formLoading = document.querySelector('.form-loading');
const logoutBtn = document.getElementById('logout-btn');

// Инициализация авторизации
const initAuth = () => {
  const savedToken = localStorage.getItem('app_token');
  const savedName = localStorage.getItem('app_name');

  if (savedToken && savedName) {
    addFormContainer.style.display = 'flex';
    authArea.style.display = 'none';
    nameInput.value = savedName;
  } else {
    addFormContainer.style.display = 'none';
    authArea.innerHTML = `
      <p style="font-size: 20px; color: #fff;">
        Чтобы добавить комментарий,
        <span class="link-login" id="go-login">войдите</span>
      </p>
    `;
    authArea.style.display = 'block';

    document.getElementById('go-login').addEventListener('click', renderLogin);
  }
};

// Загрузка и рендер комментариев
const loadAndRender = () => {
  globalLoader.style.display = 'block';
  commentsListEl.style.display = 'none';

  loadCommentsList()
    .then((comments) => {
      updateComments(comments);
      renderComments(commentsListEl);
    })
    .catch((err) => {
      console.error(err);
      alert('Не удалось загрузить комментарии. Проверьте подключение к интернету.');
    })
    .finally(() => {
      globalLoader.style.display = 'none';
      commentsListEl.style.display = 'flex';
    });
};

// Валидация
const validateComment = (text) => {
  if (!text || text.trim().length < 3) {
    alert('Комментарий должен быть не короче 3 символов');
    return false;
  }
  return true;
};

// Отправка комментария
const handleSubmit = () => {
  const text = textInput.value.trim();

  if (!validateComment(text)) return;

  if (!token) {
    renderLogin();
    return;
  }

  submitBtn.disabled = true;
  formLoading.style.display = 'block';
  submitBtn.textContent = 'Добавляем...';

  postComment(text)
    .then(() => {
      textInput.value = '';
      return loadAndRender();
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 500) {
        alert('Сервер недоступен. Попробуйте позже.');
      } else if (err.status === 400) {
        alert('Некорректные данные. Проверьте текст комментария.');
      } else {
        alert(err.message || 'Ошибка отправки комментария');
      }
    })
    .finally(() => {
      submitBtn.disabled = false;
      formLoading.style.display = 'none';
      submitBtn.textContent = 'Написать';
    });
};

submitBtn.addEventListener('click', handleSubmit);

// Выход
logoutBtn.addEventListener('click', () => {
  clearAuth();
  window.location.reload();
});

// Запуск приложения
initAuth();
loadAndRender();
