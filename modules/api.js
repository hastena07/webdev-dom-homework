const host = 'https://wedev-api.sky.pro/api/v2/:hastena07';
const authHost = 'https://wedev-api.sky.pro/api/user';

export let token = localStorage.getItem('app_token') || '';
export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('app_token', newToken);
};

export let name = localStorage.getItem('app_name') || '';
export const setName = (newName) => {
  name = newName;
  localStorage.setItem('app_name', newName);
};

export const clearAuth = () => {
  token = '';
  name = '';
  localStorage.removeItem('app_token');
  localStorage.removeItem('app_name');
};

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const request = (url, options = {}) => {
  const headers = { ...options.headers };

  return fetch(url, { ...options, headers })
    .then((res) => {
      if (res.status === 401) {
        throw new ApiError('Нет авторизации', 401);
      }
      if (!res.ok) {
        return res.json().catch(() => ({}))
          .then((data) => {
            throw new ApiError(
              data?.error || `Ошибка HTTP: ${res.status}`,
              res.status
            );
          });
      }
      if (res.status === 204) return null;
      return res.json();
    });
};

export const loadCommentsList = () => {
  return request(`${host}/comments`)
    .then((responseData) => {
      const rawComments = responseData?.comments || [];
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

export const postComment = (text) => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return request(`${host}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ text, forceError: false }),
  });
};

export const login = (loginValue, password) => {
  return request(`${authHost}/login`, {
    method: 'POST',
    body: JSON.stringify({ login: loginValue, password }),
  });
};

export const registration = (name, loginValue, password) => {
  return request(authHost, {
    method: 'POST',
    body: JSON.stringify({ name, login: loginValue, password }),
  });
};
