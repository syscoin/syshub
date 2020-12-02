import {decryptAes, encryptAes} from "./encryption";

/**
 * set the token on the localstorage
 * @function
 * @param {*} jwt jwt to save on the localstorage
 */
export function setToken(jwt) {
  window.localStorage.setItem('token', encryptAes(JSON.stringify(jwt)));
}

/**
 * get the token from localstorage
 * @function
 */
export function getToken() {
  let token = window.localStorage.getItem('token');
  if (token) {
    return {decryptedToken:JSON.parse(decryptAes(token)), token};
  }
  return null;
}

/**
 * delete the token from the localstorage
 * @function
 */
export function deleteToken() {
  window.localStorage.removeItem('token');
}
