import { HTTPAsync } from '../../redux/helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API DO IT IN ".env -> REACT_APP_SYS_MN_API"       */
/**---------------------------------------------------------------------------- */

const baseApiURL = process.env.REACT_APP_SYS_MN_API;

/**---------------------------------------------------------------------------- */

// this method get the list from alive node
export const getMnCount = actionType => {
  return HTTPAsync.post(
    `${baseApiURL}/cmd`,
    { script: 'masternode count' },
    actionType
  );
};
