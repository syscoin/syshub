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
        /* 'https://n2mra8hxj2.execute-api.us-east-1.amazonaws.com/devFunc?url=https://www.dashcentral.org/api/v1/getappdata?api_key=4f60267a65f46cd3e5f3e7c862bd98a4fa6c372560f647d282d94457919ac425' */
        'https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public"'
      )

      .then(res => {
        const data = smartParse(res.data.data, store.getState().sysStats.value);
        const newAction = { ...action, data };
        //console.log('ACZ (newAction): ', newAction);
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
