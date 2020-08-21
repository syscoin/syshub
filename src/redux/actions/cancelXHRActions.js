import constants from '../constants';
import * as cancelXHRService from '../../API/syscoin/cancelXHR.service';

export default {
  cancelAllXHR: () => {
    return async dispatch => {
      return dispatch({
          cancel: await cancelXHRService.cancelAllXHR(constants.CANCEL_XHR)
        }
      )
    };
  }
}