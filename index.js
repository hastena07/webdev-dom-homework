import { loadCommentsList, postComment, token } from './modules/api.js';
import { commentsState, updateComments } from './modules/comments.js';
import { renderComments } from './modules/renderComments.js';
import { renderLogin } from './modules/renderLogin.js';
import { renderRegistration } from './modules/rendeRegistration.js';
import { escapeHtml } from './modules/utils.js';

const commentsListEl = document.getElementById('comments-list');
const globalLoader = document.getElementById('global-loader');
const addFormContainer = document.getElementById('add-form-container');
const authArea = document.getElementById('auth-area');
const nameInput = document.getElementById('comment-name');
const textInput = document.getElementById('comment-text');
const submitBtn = document.getElementById('add-comment-btn');
const formLoading = document.querySelector('.form-loading');


const initAuth = () => {
  const savedToken = localStorage.getItem('app_token');
  if (savedToken) {
    addFormContainer.style.display = 'flex';
    authArea.style.display = 'none';
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


const validateComment = (name, text) => {
  if (!name || name.trim().length < 3) {
    alert('Имя должно быть не короче 3 символов');
    return false;
  }
  if (!text || text.trim().length < 3) {
    alert('Комментарий должен быть не короче 3 символов');
    return false;
  }
  return true;
};


const handleSubmit = () => {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!validateComment(name, text)) return;

  if (!token) {
    renderLogin();
    return;
  }

  submitBtn.disabled = true;
  formLoading.style.display = 'block';
  submitBtn.textContent = 'Добавляем...';

  postComment(name, text)
    .then(() => {
      nameInput.value = '';
      textInput.value = '';
      return loadAndRender();
    })
    .catch((err) => {
      console.error(err);
      if (err.status === 500) {
        alert('Сервер недоступен. Попробуйте позже.');
      } else if (err.status === 400) {
        alert('Некорректные данные. Проверьте имя и текст комментария.');
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


initAuth();
loadAndRender();
