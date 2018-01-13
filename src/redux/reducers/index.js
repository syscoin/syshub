import { combineReducers } from 'redux';

//Reducer imports
import appReducer from './appReducer';
import sysStatsReducer from './sysStatsReducer';

export default combineReducers({
  app: appReducer,
  sysStats: sysStatsReducer,
});
