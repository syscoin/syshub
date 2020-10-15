export function setToken(jwt) {
  window.localStorage.setItem('token', JSON.stringify(jwt));
}

export function getToken() {
  return JSON.parse(window.localStorage.getItem('token'));
}

export function deleteToken() {
  window.localStorage.removeItem('token');
}
