import constants from '../constants';
const fastXmlParser = require('fast-xml-parser');

const initialState = {
  posts: {},
};

function smartParse(json, defaultResponse) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return defaultResponse;
  }
}

function xmlParser(xmlObj, defaultResponse) {
  const jsonObj = fastXmlParser.parse(xmlObj);
  return jsonObj;
}

const mediumPosts = (state = initialState, action) => {
  switch (action.type) {
    case constants.MEDIUM_POSTS_GET:
      const posts = xmlParser(action.data.data, '').rss;
      return { ...state, posts };
      break;
    default:
      return state;
  }
};

export default mediumPosts;
