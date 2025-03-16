const TOKEN_KEY = "user-data";

const isValidUser = (user) => {
  return user && user.accessToken;
};

/**
 * set the token on the localstorage
 * @function
 * @param {*} jwt jwt to save on the localstorage
 */
export function saveUserData(user) {
  if (!isValidUser(user)) {
    console.trace("Invalid user data");
    return;
  }
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify({ ...user }));
}

/**
 * get the token from localstorage
 * @function
 */
export function getUserData() {
  const savedToken = window.localStorage.getItem(TOKEN_KEY);
  const parsedUser = JSON.parse(savedToken);

  if (!isValidUser(parsedUser)) {
    console.trace("Invalid user data");
    deleteUserData();
    return null;
  }

  return savedToken ? JSON.parse(savedToken) : null;
}

/**
 * delete the token from the localstorage
 * @function
 */
export function deleteUserData() {
  window.localStorage.removeItem(TOKEN_KEY);
}
