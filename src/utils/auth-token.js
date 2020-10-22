import {decryptAes, encryptAes} from "./encryption";

export function setToken(jwt) {
  window.localStorage.setItem('token', encryptAes(JSON.stringify(jwt)));
}

export function getToken() {
  let token = window.localStorage.getItem('token');
  if (token) {
    return {decryptedToken:JSON.parse(decryptAes(token)), token};
  }
  return null;
}

export function deleteToken() {
  window.localStorage.removeItem('token');
}
