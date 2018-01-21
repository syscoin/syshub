// curl https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public"

import constants from '../constants';

export default {
  getSysStats: () => {
    return {
      type: constants.SYS_STATS_GET,
      data: null,
    };
  },
};
