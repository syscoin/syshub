import { HTTPAsync } from '../../redux/helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API DO IT IN ".env -> REACT_APP_SYS_MN_API"       */
/**---------------------------------------------------------------------------- */

const baseApiURL = process.env.REACT_APP_SYS_MN_API;

/**---------------------------------------------------------------------------- */

export const getSysPrice = actionType => {
  return HTTPAsync.get(
    `${baseApiURL}/curl?url="https://api.coinmarketcap.com/v1/ticker/syscoin/"`,
    null,
    actionType
  );
};
