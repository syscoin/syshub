import constants from '../constants';

const initialState = {
  posts: [],
  channels: [],
  loop: 0,
};

const mediumPosts = (state = initialState, action) => {
  switch (action.type) {
    case constants.MEDIUM_POSTS_GET: {
      let { posts, channels, loop } = state;
      if (loop === action.maxCh) {
        posts = [];
        channels = [];
        loop = 0;
      }

      channels.push(action.data);
      const image = action.data.channel.image;
      let postObj;
      try {
        postObj = action.data.channel.item.map( item => ({ image, ...item }));
      } catch (err) {
        const item = action.data.channel.item;
        postObj = { image, ...item };
      }
      posts = posts.concat(postObj);
      loop += 1;
      return { ...state, posts, channels, loop };
    }
    default:
      return state;
  }
};

export default mediumPosts;
