// comments.js
import { escapeHtml } from "../modules/utils.js";

export const commentsState = [
  {
    id: 1,
    name: "Глеб Фокин",
    text: "Это будет первый комментарий на этой странице",
    date: "12.02.22 12:18",
    likesCount: 3,
    isLiked: false
  },
  {
    id: 2,
    name: "Варвара Н.",
    text: "Мне нравится как оформлена эта страница! ❤",
    date: "13.02.22 19:22",
    likesCount: 75,
    isLiked: true
  }
];

export function addComment(name, text) {
  const safeName = escapeHtml(name);
  const safeText = escapeHtml(text);

  const nextId =
    commentsState.length > 0
      ? Math.max(...commentsState.map((c) => c.id)) + 1
      : 1;

  commentsState.push({
    id: nextId,
    name: safeName,
    text: safeText,
    date: new Date().toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }),
    likesCount: 0,
    isLiked: false
  });
}

export function toggleLike(id) {
  const comment = commentsState.find((c) => c.id === id);
  if (!comment) return;

  comment.isLiked = !comment.isLiked;
  comment.likesCount = comment.isLiked ? comment.likesCount + 1 : comment.likesCount - 1;
}
