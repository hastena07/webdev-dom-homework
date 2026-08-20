import { renderComments } from "./modules/rendercomments.js";
import { addComment, toggleLike, commentsState } from "./modules/comments.js";

const addFormButton = document.querySelector(".add-form-button");
const commentsList = document.querySelector(".comments");
const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");

renderComments(commentsList);

commentsList.addEventListener("click", (event) => {
  const btn = event.target.closest(".like-button");
  if (btn) {
    event.stopPropagation();

    const id = Number(btn.dataset.id);
    toggleLike(id);
    renderComments(commentsList);
    return;
  }
  const li = event.target.closest(".comment");
  if (!li) return;

  const id = Number(li.dataset.id);
  const comment = commentsState.find((c) => c.id === id);
  if (!comment) return;

  textInput.value = `${comment.name}: ${comment.text}`;
  textInput.focus();
});

addFormButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (!name || !text) {
    alert("Пожалуйста, заполните имя и текст комментария.");
    return;
  }

  addComment(name, text);

  nameInput.value = "";
  textInput.value = "";

  renderComments(commentsList);
});
