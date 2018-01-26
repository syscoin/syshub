import axios from 'axios';

import constants from '../constants';

function smartParse(json, def) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return def;
  }
}

const nullMiddleware = store => next => action => {
  const result = next(action);
  return result;
};

export default nullMiddleware;
