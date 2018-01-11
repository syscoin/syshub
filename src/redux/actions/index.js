import constants from '../constants';

export default {
  currentUser: user => {
    return {
      type: constants.APP_LOGIN_USER,
      data: user
    };
  },
  logout: () => {
    return {
      type: constants.APP_LOGOUT_USER,
      data: null
    };
  },
  loading: value => {
    return {
      type: constants.APP_LOADING_GLOBAL,
      data: value
    };
  }
};
