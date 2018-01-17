import constants from '../constants';

const initialState = {
  valueNew: {
    general: {
      consensus_blockheight: '805650',
      consensus_version: '120202',
      consensus_protocolversion: '70208',
      all_user: '3648',
      registered_masternodes: '3036',
      registered_masternodes_verified: '1087',
    },
    exchange_rates: {
      dash_usd: 717.9151045,
      btc_usd: '10450.00',
      btc_dash: '0.06870001',
    },
  },
  valueOld: {
    general: {
      consensus_blockheight: '805694',
      consensus_version: '120202',
      consensus_protocolversion: '70208',
      all_user: '3648',
      registered_masternodes: '3036',
      registered_masternodes_verified: '1087',
    },
    exchange_rates: {
      dash_usd: 712.4703203664,
      btc_usd: '10502.64',
      btc_dash: '0.06783726',
    },
  },
  valueOldCopy: {
    general: {
      consensus_blockheight: '805694',
      consensus_version: '120202',
      consensus_protocolversion: '70208',
      all_user: '3648',
      registered_masternodes: '3036',
      registered_masternodes_verified: '1087',
    },
    exchange_rates: {
      dash_usd: 712.4703203664,
      btc_usd: '10502.64',
      btc_dash: '0.06783726',
    },
  },
  valueDiff: {},
  cards: [
    {
      img: 'png_stasts_sys.png',
      num: 'exchange_rates.btc_usd',
      text: 'BTC/1000 USD',
      percentage: '9%',
      arrow: 'png_button_down.png',
    },
    {
      img: 'png_menu_masternodes_selected.png',
      num: 0,
      text: 'REGISTERED MASTERNODES',
      percentage: '10%',
      arrow: 'png_button_up.png',
    },
    {
      img: 'png_stats_users.png',
      num: 0,
      text: 'ALL USERS',
      percentage: '9%',
      arrow: 'png_button_down.png',
    },
  ],
};

const sysStats = (state = initialState, action) => {
  switch (action.type) {
    case constants.SYS_STATS_SET:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default sysStats;
