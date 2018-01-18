import axios from 'axios';
import constants from '../constants';

const SysGetStats = store => next => action => {
  //if (action.appLoadingGlobal !== undefined) {
  //  store.dispatch(appLoadingGlobal(action.appLoadingGlobal));
  //}
  console.log('==========================================================');
  let SysStat = null;

  axios
    .get('http://www.dashcentral.org/api/v1/public', {
      withCredentials: true,
    })
    .then(res => {
      console.log('dddddddddddddddddddddd');
      const result = next(action);
      return result;
    })
    .catch(err => console.log('ERROR: ', err));
  
};

export default SysGetStats;
