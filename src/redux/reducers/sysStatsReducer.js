import constants from '../constants';

const initialState = {
  sysCoinRate: ' 0.000023 BTC / 1000 USD',
  registerMN: ' 0415 / 0430',
  users: '2000',
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
