import { combineReducers } from 'redux';

//Reducer imports
import app from './appReducers';
import sysStats from './sysStatsReducers';
import proposals from './proposalReducers';
import mediumPosts from './mediumReducers';
import mnInfo from './mnInfoReducer';
import governance from './sysGovernanceReducers';

export default combineReducers({
  app,
  sysStats,
  proposals,
  mediumPosts,
  mnInfo,
  governance
});
