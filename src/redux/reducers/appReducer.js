import constants from '../constants';

const initialState = {
  SysStats: [
  {
    img: 'png_stasts_sys.png',
    num: '0.00022',
    text: 'BTC 1000 USD',
    percentage: '9%',
    arrow: 'png_button_down.png'
  },
  {
    img: 'png_menu_masternodes_selected.png',
    num: '0415/0430',
    text: 'REGISTERED MASTER NODES',
    percentage: '10%',
    arrow: 'png_button_up.png'
  },
  {
    img: 'png_stats_users.png',
    num: '2000',
    text: 'ALL USERS',
    percentage: '9%',
    arrow: 'png_button_down.png'
  }
  ]
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
