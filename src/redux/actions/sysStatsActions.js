// curl https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public"

import constants from '../constants';

import { HTTPAsync } from '../helpers';

export default {
  getSysStats: () => {
    return dispatch => {
      return dispatch(
        HTTPAsync.get(
          'http://localhost:3000/API/curl?url="https://www.dashcentral.org/api/v1/public',
          //'https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public',
          //'http://159.89.141.35:3000/curl?url="https://www.dashcentral.org/api/v1/public',
          //'https://n2mra8hxj2.execute-api.us-east-1.amazonaws.com/devFunc?url=https://www.dashcentral.org/api/v1/getappdata?api_key=4f60267a65f46cd3e5f3e7c862bd98a4fa6c372560f647d282d94457919ac425',
          null,
          constants.SYS_STATS_GET
        )
      );
    };
  },
};
