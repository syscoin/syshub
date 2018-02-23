// curl https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public"

import constants from '../constants';

import { HTTPAsync } from '../helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API GO TO "/src/redux/constants/apiURLsConst.js"  */
/**---------------------------------------------------------------------------- */

const baseApiURL = constants.URL_SYS_MN_API; // Quang HTTPS server

/**---------------------------------------------------------------------------- */

export default {
  getSysStats: (first) => {
    return dispatch => {
      return dispatch(
        HTTPAsync.get(
          `${baseApiURL}/curl?url="https://www.dashcentral.org/api/v1/public"`,
          //'http://localhost:3000/API/curl?url="https://www.dashcentral.org/api/v1/public',
          //'https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public',
          //'https://n2mra8hxj2.execute-api.us-east-1.amazonaws.com/devFunc?url=https://www.dashcentral.org/api/v1/getappdata?api_key=4f60267a65f46cd3e5f3e7c862bd98a4fa6c372560f647d282d94457919ac425',
          //'http://localhost:8080',
          null,
          first === 'first' ? constants.SYS_STATS_FIRST :
            constants.SYS_STATS_GET
        )
      );
    };
  },
  getSysMnCount: () => {
    return dispatch => {
      return dispatch(
        HTTPAsync.post(
          `${baseApiURL}/cmd`,
          {
            'script': 'masternode count'

          },
          constants.SYS_STATS_MN_GET
        )
      );
    };
  }
};
