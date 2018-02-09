// curl https://d3j22jloo6hpq6.cloudfront.net/API/curl?url="https://www.dashcentral.org/api/v1/public"

import constants from '../constants';

import { HTTPAsync } from '../helpers';


//const baseApiURL = 'http://159.89.151.42:3000'; // New net
const baseApiURL = 'https://www.qnguyen.xyz'; // Quang HTTPS server


export default {
  getMediumPosts: () => {
    return dispatch => {
      return dispatch(
        HTTPAsync.get(
          `${baseApiURL}/curl?url="https://medium.com/feed/@BlockchainFoundry"`,
          null,
          constants.MEDIUM_POSTS_GET
        )
      );
    };
  }
};
