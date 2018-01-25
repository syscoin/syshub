import constants from '../constants';

export default {
  setCurrentUser: user => {
    return {
      type: constants.APP_USER_LOGIN,
      data: user
    };
  },
  doLogout: () => {
    return {
      type: constants.APP_USER_LOGOUT,
      data: null
    };
  },
  setPage: value => {
    return {
      type: constants.APP_PAGE_SHOW,
      data: value
    };
  },
  toggleChat: () => {
    return {
      type: constants.APP_CHAT_TOGGLE,
      data: null
    };
  },
  loading: value => {
    return {
      type: constants.APP_LOADING_GLOBAL,
      data: value
    };
  },
  setAuth: value => {
    return {
      type: constants.SET_AUTH,
      data: value
    };
  }
};
