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
  ],
  totMn: 0,
  regMn: 0,
  users: 0
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

    case constants.SYS_STATS_PRICE_GET: {
      const sysPrice = smartParse(action.data.data, [])[0];
      return { ...state, sysPrice };
    }
    case constants.SYS_STATS_TMN_GET: {
      return { ...state, totMn: action.data };
    }
    case constants.SYS_STATS_RMN_GET: {
      return { ...state, regMn: action.data };
    }
    case constants.SYS_STATS_USER_GET: {
      return { ...state, users: action.data };
    }
    default:
      return state;
  }
};

export default sysStats;