import { combineReducers } from 'redux';

//Reducer imports
import app from './appReducers';
import sysStats from './sysStatsReducers';
import proposals from './proposalReducers';

export default combineReducers({
  app,
  sysStats,
  proposals,
});
