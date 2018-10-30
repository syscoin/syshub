import constants from '../constants';

import {
  HTTPAsync
} from '../helpers';

const fastXmlParser = require('fast-xml-parser');


/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API GO TO "/src/redux/constants/apiURLsConst.js"  */
/**---------------------------------------------------------------------------- */

const baseApiURL = constants.URL_SYS_MN_API; // Quang HTTPS server

/**---------------------------------------------------------------------------- */

function xmlParser(xmlObj) {
  if (fastXmlParser.validate(xmlObj) === true) {
    const jsonObj = fastXmlParser.parse(xmlObj);
    return jsonObj;
  }
}

const mediumFeed = 'https://medium.com/feed/';
const mediumChannels= [ '@BlockchainFoundry', '@syscoincommunity' ];

export default {
  getMediumPosts: () => {
    return dispatch => {
      return (
        mediumChannels.map( user => 
          HTTPAsync.onlyGet(`${baseApiURL}/curl?url=${mediumFeed}${user}`,null,)
          .then( data => {
            console.log('ACZ --> ', data);
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