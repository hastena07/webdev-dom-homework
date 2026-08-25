import { renderComments } from './modules/rendercomments.js';
import { toggleLike, commentsState, updateComments } from './modules/comments.js';
import { loadCommentsList, postComment, ApiError } from './modules/api.js';

const addFormButton = document.querySelector('.add-form-button');
const commentsList = document.querySelector('.comments');
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const formLoading = document.querySelector('.form-loading');
const commentsLoading = document.querySelector('.comments-loading');
const addForm = document.querySelector('.add-form');


let lastNameValue = '';
let lastTextValue = '';

function loadAndRenderComments() {
  if (commentsLoading) {
    commentsLoading.style.display = 'block';
  }
  commentsList.innerHTML = '';

  return loadCommentsList()
    .then((data) => {
      updateComments(data);
      renderComments(commentsList);
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof ApiError) {
        if (err.status === 500) {
          alert('Сервер временно недоступен. Попробуйте позже.');
        } else if (err.status >= 400 && err.status < 500) {
          alert('Ошибка запроса: ' + err.message);
        } else {
          alert('Произошла ошибка: ' + err.message);
        }
      } else if (err.name === 'TypeError' && err.message.includes('fetch')) {
        alert('Нет соединения с сервером. Проверьте интернет.');
      } else {
        alert('Произошла непредвиденная ошибка.');
      }
    })
    .finally(() => {
      if (commentsLoading) {
        commentsLoading.style.display = 'none';
      }
    });
}

commentsList.addEventListener('click', (event) => {
  const btn = event.target.closest('.like-button');
  if (btn) {
    event.stopPropagation();
    const id = Number(btn.dataset.id);
    toggleLike(id);
    renderComments(commentsList);
    return;
  }

  const li = event.target.closest('.comment');
  if (!li) return;

  const id = Number(li.dataset.id);
  const comment = commentsState.find((c) => c.id === id);
  if (!comment) return;

  textInput.value = `${comment.name}: ${comment.text}`;
  textInput.focus();
});

async function sendCommentWithRetry(name, text, retriesLeft = 3) {
  try {
    await postComment(name, text);
    return true; 
  } catch (err) {
   
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Нет соединения с сервером');
    }

    if (!(err instanceof ApiError)) {
      throw err;
    }
    if (err.status === 500 && retriesLeft > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return sendCommentWithRetry(name, text, retriesLeft - 1);
    }

    throw err;
  }
}

addFormButton.addEventListener('click', async () => {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) {
    alert('Пожалуйста, заполните имя и текст комментария.');
    return;
  }

  lastNameValue = name;
  lastTextValue = text;

  addFormButton.disabled = true;
  addFormButton.textContent = 'Отправка...';

  try {
    await sendCommentWithRetry(name, text);

    await loadAndRenderComments();

    nameInput.value = '';
    textInput.value = '';
    lastNameValue = '';
    lastTextValue = '';
  } catch (err) {
    console.error(err);

    if (formLoading) {
      formLoading.style.display = 'block';
    }
    if (addForm) {
      addForm.style.display = 'flex';
    }

    nameInput.value = lastNameValue;
    textInput.value = lastTextValue;

    if (err instanceof ApiError) {
      if (err.status === 500) {
        alert('Сервер временно недоступен. Мы несколько раз пытались повторить запрос, но безуспешно. Попробуйте позже.');
      } else if (err.status >= 400 && err.status < 500) {
        alert('Ошибка запроса (4xx): ' + err.message);
      } else {
        alert('Произошла ошибка: ' + err.message);
      }
    } else if (err.message === 'Нет соединения с сервером') {
      alert('Нет соединения с интернетом. Проверьте подключение.');
    } else {
      alert('Произошла непредвиденная ошибка: ' + err.message);
    }
  } finally {
    addFormButton.disabled = false;
    addFormButton.textContent = 'Написать';
  }
});

loadAndRenderComments();
