const TOKEN_KEY = "comment_app_token";
const USER_KEY = "comment_app_user";

// Замените на реальный базовый URL вашего API
const BASE_URL = "https://wedev-api.sky.pro/api/v2/hastena07";

export const getAuthState = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
  };
};

export const setAuth = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const login = async (login, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || `Ошибка входа: ${res.status}`);
  }
  const data = await res.json();
  const token = data.token;
  const user = data.user;
  setAuth(token, user);
  return { token, user };
};

export const register = async (name, login, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, login, password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || `Ошибка регистрации: ${res.status}`);
  }
  const data = await res.json();
  const token = data.token;
  const user = data.user;
  setAuth(token, user);
  return { token, user };
};
