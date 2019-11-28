import { HTTPAsync } from "../../redux/helpers";
import axios from "axios";

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API DO IT IN ".env -> REACT_APP_SYS_MN_API"       */
/**---------------------------------------------------------------------------- */

const baseApiURL = process.env.REACT_APP_SYS_MN_API;

/**---------------------------------------------------------------------------- */

const PROVIDERS = {
  coinmarketcap: `${baseApiURL}/curl?url="https://api.coinmarketcap.com/v1/ticker/syscoin/"`,
  coingecko:
    "https://api.coingecko.com/api/v3/simple/price?ids=syscoin&vs_currencies=usd"
};

const activeProvider = "coingecko";

export const getSysPrice = actionType => {
  return coingeckoFetcher(`${PROVIDERS[activeProvider]}`, null, actionType);
};

const coingeckoFetcher = (url, params, actionType) => {
  return dispatch =>
    axios
      .get(url, params)
      .then(response => {
        return response.data;
      })
      .then(data => {
        console.log("ACZ data -->", data);
        if (actionType != null) {
          dispatch({
            type: actionType,
            data: data
          });
        }
        return data;
      })
      .catch(err => {
        throw err;
      });
};
