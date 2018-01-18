import { combineReducers } from 'redux';

//Reducer imports
import app from './appReducer';
import sysStats from './sysStatsReducer';
import proposals from './proposalReducer';

export default combineReducers({
  app,
  sysStats,
  proposals,
});
