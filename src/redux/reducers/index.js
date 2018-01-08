import { combineReducers } from 'redux';

//Reducer imports
import appReducer from './appReducer';

export default combineReducers({
  app: appReducer,
});
