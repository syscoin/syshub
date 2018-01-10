import constants from '../constants';

const initialState = {
  showPage: 'home',
  showChat: true,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case constants.APP_LOADING_GLOBAL: {
      const loader = state.loader;
      loader.globalShow = action.globaloader;
      return { ...state, loader };
    }

    default:
      return state;
  }
};

export default app;
