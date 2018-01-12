import constants from '../constants';

const initialState = {
  currentUser: null,
  showPage: 'homesssss',
  showChat: true,
  loading: false,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case constants.APP_LOGIN_USER:
      return {
        ...state,
        currentUser: action.data,
        showPage: 'home',
        loading: false,
      };

    case constants.APP_LOGOUT_USER:
      return {
        ...state,
        currentUser: action.data,
        showPage: 'home',
        loading: false,
      };

    case constants.APP_LOADING:
      return { ...state, loading: action.data };

    default:
      return state;
  }
};

export default app;
