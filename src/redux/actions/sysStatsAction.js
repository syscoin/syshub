import axios from 'axios';

import constants from '../constants';

export default {
  getSysStat: () => {
    return {
      type: constants.SYS_STATS_SET,
      data: null,
    };
  },
};
