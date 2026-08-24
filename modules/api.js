const host = 'https://wedev-api.sky.pro/api/v1/hastena07';

export const loadCommentsList = () => {
  return fetch(host + '/comments')
    .then((res) => {
       if (!res.ok) {
        return res.json().catch(() => ({}))
          .then((data) => {
            throw new ApiError(
              data?.error || `Ошибка загрузки комментариев: ${res.status}`,
              res.status
            );
          });
      }
      return res.json();
    })
    .then((responseData) => {
      const rawComments = responseData.comments || [];
      return rawComments.map((comment) => ({
        id: comment.id,
        name: comment.author?.name ?? 'Аноним',
        text: comment.text ?? '',
        date: new Date(comment.date).toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        likesCount: Number(comment.likes) || 0,
        isLiked: false,
        isLikeLoading: false,
      }));
    });
};

export const postComment = (name, text) => {
  return fetch(host + '/comments', {
    method: 'POST',
    headers: { 'Content-Type': '' },
    body: JSON.stringify({ name, text, forceError: false }),
  })
  .then((res) => {
    if (!res.ok) {
      return res.json().catch(() => ({}))
        .then((data) => {
          throw new ApiError(
            data?.error || `Ошибка отправки комментария: ${res.status}`,
            res.status
          );
        });
    }
    if (res.status === 204) return null;
    return res.json().catch(() => null);
  });
};
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
};
