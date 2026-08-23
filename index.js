import { renderComments } from './modules/rendercomments.js';
import { toggleLike, commentsState, updateComments } from './modules/comments.js';
import { loadCommentsList, postComment } from './modules/api.js';

const addFormButton = document.querySelector('.add-form-button');
const commentsList = document.querySelector('.comments');
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const formLoading = document.querySelector('.form-loading');
const commentsLoading = document.querySelector('.comments-loading');
const addForm = document.querySelector('.add-form');

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
      alert('Не удалось загрузить комментарии. Проверьте консоль.');
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

addFormButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  
  if (!name || !text) {
    alert('Пожалуйста, заполните имя и текст комментария.');
    return;
  }

  addFormButton.disabled = true;
  addFormButton.textContent = 'Отправка...';

  if (formLoading) {
    formLoading.style.display = 'block';
  }
  if (addForm) {
    addForm.style.display = 'none';
  }

  postComment(name, text)
    .then(() => loadAndRenderComments())
    .then(() => {
      
      if (formLoading) {
        formLoading.style.display = 'none';
      }
      if (addForm) {
        addForm.style.display = 'flex';
      }

      nameInput.value = '';
      textInput.value = '';
    })
    .catch((err) => {
      console.error(err);
      
      if (formLoading) {
        formLoading.style.display = 'none';
      }
      if (addForm) {
        addForm.style.display = 'flex';
      }

      alert('Не удалось добавить комментарий: ' + err.message);
    })
    .finally(() => {
      addFormButton.disabled = false;
      addFormButton.textContent = 'Написать';
    });
});

loadAndRenderComments();
