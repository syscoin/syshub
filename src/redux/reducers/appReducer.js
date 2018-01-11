import constants from '../constants';

const initialState = {
  currentUser: null,
  showPage: 'home',
  showChat: true,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case constants.APP_LOGIN_USER: {
      const currentUser = action.currentUser;
      return { ...state, currentUser };
    }
    default:
      return state;
  }
};

export default app;
