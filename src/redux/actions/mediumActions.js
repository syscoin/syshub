// curl https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public"

import constants from '../constants';

import { HTTPAsync } from '../helpers';

export default {
  getMediumPosts: () => {
    return dispatch => {
      return dispatch(
        HTTPAsync.get(
          'http://159.89.141.35:3000/curl?url="https://medium.com/feed/@BlockchainFoundry"',
          null,
          constants.MEDIUM_POSTS_GET
        )
      );
    };
  },
};
