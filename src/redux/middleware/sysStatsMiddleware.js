import axios from 'axios';

import constants from '../constants';

function smartParse(json, def) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return def;
  }
}

const getSysStats = store => next => action => {
  if (action.type === constants.SYS_STATS_GET) {
    axios
      .get(
        'https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public"'
      )
      /* .get(
        'http://159.89.141.35:3000/curl?url="https://www.dashcentral.org/api/v1/public"'
      ) */
      .then(res => {
        console.log(res);

        const data = smartParse(res.data.data, store.getState().sysStats.value);
        const newAction = { ...action, data };
        const result = next(newAction);
        return result;
      })
      .catch();
  } else {
    const result = next(action);
    return result;
  }
};

export default getSysStats;
