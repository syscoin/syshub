import { appLoadingGlobal } from '../actions/appActions';

const getSysStats = store => next => action => {
  const result = next(action);
  return result;
};

export default getSysStats;
