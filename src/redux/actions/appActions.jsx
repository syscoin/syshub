import constants from '../constants';

export default {
  setCurrentUser: user => {
    return {
      type: constants.APP_LOGIN_USER,
      data: user,
    };
  },
  doLogout: () => {
    return {
      type: constants.APP_LOGOUT_USER,
      data: null,
    };
  },
  loading: value => {
    return {
      type: constants.APP_LOADING_GLOBAL,
      data: value,
    };
  },
};
