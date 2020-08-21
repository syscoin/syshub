import constants from '../constants';
import HTTPAsync from '../helpers/HTTPAsync';

const initialState = {
  // cancelToken: HTTPAsync.cancelSourceXHR
}


const cancelXHR = (state = initialState, action) => {
  switch (action.type) {
    case constants.CANCEL_XHR:
      return {
        ...state,
        cancelToken: action.data
      }
    default:
      return state
  }

};

export default cancelXHR;
