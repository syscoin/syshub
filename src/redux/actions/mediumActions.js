import constants from '../constants';

import {
  HTTPAsync
} from '../helpers';

const fastXmlParser = require('fast-xml-parser');


/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API DO IT IN ".env -> REACT_APP_SYS_MN_API"       */
/**---------------------------------------------------------------------------- */

const baseApiURL = process.env.REACT_APP_SYS_MN_API;

/**---------------------------------------------------------------------------- */

function xmlParser(xmlObj) {
  if (fastXmlParser.validate(xmlObj) === true) {
    const jsonObj = fastXmlParser.parse(xmlObj);
    return jsonObj;
  }
}

const mediumFeed = 'https://medium.com/feed/';
const mediumChannels= [ '@BlockchainFoundry', '@syscoincommunity', '@syscoin' ];

export default {
  getMediumPosts: () => {
    return dispatch => {
      return (
        mediumChannels.map( user => 
          HTTPAsync.onlyGet(`${baseApiURL}/curl?url=${mediumFeed}${user}`,null,)
          .then( data => {
            const parsedData = xmlParser(data.data).rss;
            dispatch({
              type: constants.MEDIUM_POSTS_GET,
              maxCh: mediumChannels.length,
              data: parsedData,
            })
          })
        )
      );
    };
  }
};