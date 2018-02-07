import constants from '../constants';

const initialState = {
  currentUser: null,
  showPage: 'home',
  showChat: false,
  showMenu: false,
  platform: {},
  loading: false,
  auth: false,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case constants.APP_USER_LOGIN:
      return {
        ...state,
        currentUser: action.data,
        loading: false,
      };

    case constants.APP_USER_LOGOUT:
      return {
        ...state,
        currentUser: action.data,
        showPage: 'home',
        loading: false,
      };

    case constants.APP_PAGE_SHOW:
      return {
        ...state,
        showPage: action.data,
      };

    case constants.APP_CHAT_TOGGLE:
      return {
        ...state,
        showChat: !state.showChat,
      };

    case constants.APP_MENU_TOGGLE:
      return {
        ...state,
        showMenu: !state.showMenu,
      };

    case constants.APP_PLATFORM_GET: {
      return {
        ...state,
        platform: action.data,
      };
    }

    case constants.APP_LOADING:
      return { ...state, loading: action.data };

    case constants.SET_AUTH:
      return { ...state, auth: action.data };

    default:
      return state;
  }
};

export default app;
