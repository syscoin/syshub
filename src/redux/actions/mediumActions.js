import constants from '../constants';
import * as mediumService from '../../API/medium/medium.service';

const fastXmlParser = require('fast-xml-parser');

function xmlParser(xmlObj) {
  if (fastXmlParser.validate(xmlObj) === true) {
    const jsonObj = fastXmlParser.parse(xmlObj);
    return jsonObj;
  }
}

const mediumChannels = ['@BlockchainFoundry', '@syscoincommunity', '@syscoin'];

export default {
  getMediumPosts: () => {
    return dispatch => {
      return mediumChannels.map(user =>
        mediumService.getMediumUserPosts(user).then(data => {
          const parsedData = xmlParser(data.data).rss;
          dispatch({
            type: constants.MEDIUM_POSTS_GET,
            maxCh: mediumChannels.length,
            data: parsedData
          });
        })
      );
    };
  }
};
