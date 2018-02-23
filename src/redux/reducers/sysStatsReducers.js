import constants from '../constants';

const initialState = {
  cards: [
    {
      img: 'png_stasts_sys.png',
      key: 'changeRate',
      text: 'BTC/SYS'
    },
    {
      img: 'png_menu_masternodes_selected.png',
      key: 'masternodes',
      text: 'REGISTERED MASTERNODES'
    },
    {
      img: 'png_stats_users.png',
      key: 'totUsers',
      text: 'ALL USERS'
    }
  ]
};

function smartParse(json, def) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return def;
  }
}

const sysStats = (state = initialState, action) => {
  switch (action.type) {
    case constants.SYS_STATS_GET: {
      const value = state.value;
      const valueOld = state.valueOld;
      const newValue = smartParse(action.data.data, value);
      const statsChanged =
        JSON.stringify(value) === JSON.stringify(newValue) ? false : true;

      return statsChanged
        ? { ...state, value: newValue, valueOld: value }
        : { ...state, value, valueOld };
    }
    case constants.SYS_STATS_FIRST: {
      const newValue = smartParse(action.data.data, state.value);
      return { ...state, value: newValue, valueOld: newValue };
    }
    case constants.SYS_STATS_MN_GET: {
      return { ...state, MnCount: action.data };
    }

    default:
      return state;
  }
};

export default sysStats;
