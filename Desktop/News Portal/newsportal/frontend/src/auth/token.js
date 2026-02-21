const KEY = "newsportal_token";
const USER_KEY = "newsportal_user";

export function setAuth(token, user) {
  localStorage.setItem(KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function getToken() {
  return localStorage.getItem(KEY);
}
export function getUser() {
  const v = localStorage.getItem(USER_KEY);
  return v ? JSON.parse(v) : null;
}
export function clearAuth() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(USER_KEY);
}
