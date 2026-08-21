import { renderComments } from './modules/rendercomments.js';
import { toggleLike, commentsState, updateComments } from './modules/comments.js';
import { fetchComments, postComment } from './modules/api.js';

const addFormButton = document.querySelector('.add-form-button');
const commentsList = document.querySelector('.comments');
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');


fetchComments()
  .then(data => {
    updateComments(data);
    renderComments(commentsList);
  })
  .catch(err => {
    console.error(err);
    alert('Не удалось загрузить комментарии. Проверьте консоль.');
  });

commentsList.addEventListener('click', event => {
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
  const comment = commentsState.find(c => c.id === id);
  if (!comment) return;

  textInput.value = `${comment.name}: ${comment.text}`;
  textInput.focus();
});

addFormButton.addEventListener('click', async () => {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) {
    alert('Пожалуйста, заполните имя и текст комментария.');
    return;
  }

  addFormButton.disabled = true;
  addFormButton.textContent = 'Отправка...';

  try {
    await postComment(name, text);
    
    const data = await fetchComments();
    updateComments(data);
    renderComments(commentsList);

    nameInput.value = '';
    textInput.value = '';
  } catch (err) {
    console.error(err);
    alert('Не удалось добавить комментарий. Попробуйте позже.');
  } finally {
    addFormButton.disabled = false;
    addFormButton.textContent = 'Написать';
  }
});
