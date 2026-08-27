import { delay } from '../modules/utils.js';

export const commentsState = [];

export const updateComments = (newComments) => {
  commentsState.length = 0;
  newComments.forEach((c) => commentsState.push(c));
};

export function toggleLike(id) {
  const comment = commentsState.find((c) => c.id === id);
  if (!comment || comment.isLikeLoading) return;

  comment.isLikeLoading = true;

  delay(800).then(() => {
    comment.isLiked = !comment.isLiked;
    comment.likesCount = comment.isLiked ? comment.likesCount + 1 : comment.likesCount - 1;
    comment.isLikeLoading = false;
  });
}
