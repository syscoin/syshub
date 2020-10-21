import {decryptAes, encryptAes} from "./encryption";

export function setToken(jwt) {
  window.localStorage.setItem('token', encryptAes(JSON.stringify(jwt)));
  console.log(encryptAes(JSON.stringify(jwt)))
}

export function getToken() {
  let token = window.localStorage.getItem('token');
  if (token) {
    return JSON.parse(decryptAes(token));
  }

}

export function deleteToken() {
  window.localStorage.removeItem('token');
}
