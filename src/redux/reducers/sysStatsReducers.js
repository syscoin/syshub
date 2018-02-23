import constants from '../constants';

const initialState = {
  /*   value: {
      general: {
        consensus_blockheight: '805650',
        consensus_version: '120202',
        consensus_protocolversion: '70208',
        all_user: '3648',
        registered_masternodes: '3036',
        registered_masternodes_verified: '787'
      },
      exchange_rates: {
        dash_usd: 1,
        btc_usd: '1',
        btc_dash: '1'
      }
    },
    valueOld: {
      general: {
        consensus_blockheight: '805694',
        consensus_version: '120202',
        consensus_protocolversion: '70208',
        all_user: '3648',
        registered_masternodes: '3036',
        registered_masternodes_verified: '1047'
      },
      exchange_rates: {
        dash_usd: 712.4703203664,
        btc_usd: '1',
        btc_dash: '0.06783726'
      }
    }, */

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
