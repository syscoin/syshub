const TOKEN_KEY = "user-data";

/**
 * set the token on the localstorage
 * @function
 * @param {*} jwt jwt to save on the localstorage
 */
export function saveUserData(user) {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify({ ...user }));
}

/**
 * get the token from localstorage
 * @function
 */
export function getUserData() {
  const savedToken = window.localStorage.getItem(TOKEN_KEY);
  return savedToken ? JSON.parse(savedToken) : null;
}

/**
 * delete the token from the localstorage
 * @function
 */
export function deleteUserData() {
  window.localStorage.removeItem(TOKEN_KEY);
}
