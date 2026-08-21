const host = 'https://glebkaf.github.io/webdev-dom-homework/';

export const fetchComments = () => {
  return fetch(host + '/comments')
    .then(res => {
      if (!res.ok) throw new Error(`Ошибка загрузки комментариев: ${res.status}`);
      return res.json();
    })
    .then(responseData => {
      const rawComments = responseData.comments || [];
      return rawComments.map(comment => ({
        id: comment.id,
        name: comment.author?.name ?? 'Аноним',
        text: comment.text ?? '',
        date: new Date(comment.date).toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        likesCount: Number(comment.likes) || 0,
        isLiked: false, 
      }));
    });
};

export const postComment = (name, text) => {
  
  return fetch(host + '/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, text }),
  })
  .then(res => {
    if (!res.ok) throw new Error(`Ошибка отправки комментария: ${res.status}`);
    
    if (res.status === 204) return null;
    return res.json().catch(() => null);
  });
};
