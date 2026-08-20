// renderComments.js
import { escapeHtml } from "../modules/utils.js";
import { commentsState } from "../modules/comments.js";

export function renderComments(commentsList) {
  commentsList.innerHTML = "";

  commentsState.forEach((comment) => {
    const li = document.createElement("li");
    li.className = "comment";
    li.dataset.id = String(comment.id);

    const header = document.createElement("div");
    header.className = "comment-header";

    const nameDiv = document.createElement("div");
    nameDiv.textContent = escapeHtml(comment.name);

    const dateDiv = document.createElement("div");
    dateDiv.textContent = escapeHtml(comment.date);

    header.appendChild(nameDiv);
    header.appendChild(dateDiv);

    const body = document.createElement("div");
    body.className = "comment-body";

    const textDiv = document.createElement("div");
    textDiv.className = "comment-text";
    textDiv.textContent = escapeHtml(comment.text);

    body.appendChild(textDiv);

    const footer = document.createElement("div");
    footer.className = "comment-footer";

    const likesWrap = document.createElement("div");
    likesWrap.className = "likes";

    const likesCounter = document.createElement("span");
    likesCounter.className = "likes-counter";
    likesCounter.textContent = comment.likesCount;

    const likeButton = document.createElement("button");
    likeButton.className = "like-button";

    if (comment.isLiked) {
      likeButton.textContent = ""; 
      likeButton.classList.add("-active-like");
    } else {
      likeButton.textContent = ""; 
    }

    likeButton.dataset.id = String(comment.id);

    likesWrap.appendChild(likesCounter);
    likesWrap.appendChild(likeButton);
    footer.appendChild(likesWrap);

    li.appendChild(header);
    li.appendChild(body);
    li.appendChild(footer);
    commentsList.appendChild(li);
  });
}
