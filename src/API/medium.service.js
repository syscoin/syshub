import { HTTPAsync } from '../redux/helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API DO IT IN ".env -> REACT_APP_SYS_MN_API"       */
/**---------------------------------------------------------------------------- */

const baseApiURL = process.env.REACT_APP_SYS_MN_API;

/**---------------------------------------------------------------------------- */

const mediumFeed = 'https://medium.com/feed/';

export const getMediumUserPosts = user => {
  return HTTPAsync.onlyGet(`${baseApiURL}/curl?url=${mediumFeed}${user}`, null);
};
