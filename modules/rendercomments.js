import { escapeHtml } from '../modules/utils.js';
import { commentsState, toggleLike } from '../modules/comments.js';

export function renderComments(commentsListEl) {
  if (!commentsListEl) return;
  commentsListEl.innerHTML = '';

  if (commentsState.length === 0) {
    commentsListEl.innerHTML = '<li style="padding:48px; color:#888;">Комментариев пока нет</li>';
    return;
  }

  commentsState.forEach((comment) => {
    const li = document.createElement('li');
    li.className = 'comment';
    li.dataset.id = String(comment.id);

    const header = document.createElement('div');
    header.className = 'comment-header';

    const nameDiv = document.createElement('div');
    nameDiv.textContent = escapeHtml(comment.name);

    const dateDiv = document.createElement('div');
    dateDiv.textContent = escapeHtml(comment.date);

    header.appendChild(nameDiv);
    header.appendChild(dateDiv);

    const body = document.createElement('div');
    body.className = 'comment-body';

    const textDiv = document.createElement('div');
    textDiv.className = 'comment-text';
    textDiv.textContent = escapeHtml(comment.text);

    body.appendChild(textDiv);

    const footer = document.createElement('div');
    footer.className = 'comment-footer';

    const likesWrap = document.createElement('div');
    likesWrap.className = 'likes';

    const likesCounter = document.createElement('span');
    likesCounter.className = 'likes-counter';
    likesCounter.textContent = comment.likesCount;

    const likeButton = document.createElement('button');
    likeButton.className = 'like-button';

    if (comment.isLiked) {
      likeButton.classList.add('-active-like');
    } else {
      likeButton.classList.remove('-active-like');
    }

    if (comment.isLikeLoading) {
      likeButton.classList.add('-loading-like');
    } else {
      likeButton.classList.remove('-loading-like');
    }

    likeButton.dataset.id = String(comment.id);

    
    likeButton.addEventListener('click', () => {
      toggleLike(comment.id);
      renderComments(commentsListEl); 
    });

    likesWrap.appendChild(likesCounter);
    likesWrap.appendChild(likeButton);
    footer.appendChild(likesWrap);

    li.appendChild(header);
    li.appendChild(body);
    li.appendChild(footer);
    commentsListEl.appendChild(li);
  });
}
