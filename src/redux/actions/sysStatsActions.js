import constants from '../constants';
import * as mnService from '../../API/masternodes.service';
import * as sysService from '../../API/syscoin.service';

export default {
  getSysMnRegistered: mnRegisteredTotal => {
    return dispatch =>
      dispatch({
        type: constants.SYS_STATS_RMN_GET,
        data: mnRegisteredTotal
      });
  },

  getSysUserRegistered: () => {
    return dispatch =>
      dispatch(mnService.getUserRegistered(constants.SYS_STATS_USER_GET));
  },

  getSysPrice: () => {
    return dispatch => {
      return dispatch(sysService.getSysPrice(constants.SYS_STATS_PRICE_GET));
    };
  },

  getSysMnCount: () => {
    return dispatch => {
      return dispatch(mnService.getMnCount(constants.SYS_STATS_TMN_GET));
    };
  }
};
