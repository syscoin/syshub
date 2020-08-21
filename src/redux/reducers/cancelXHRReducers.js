import constants from '../constants';
import HTTPAsync from '../helpers/HTTPAsync';

const initialState = {
  cancelToken: HTTPAsync.cancelSourceXHR
}


const cancelXHR = (state = initialState, action) => {
  return state;
};

export default cancelXHR;
