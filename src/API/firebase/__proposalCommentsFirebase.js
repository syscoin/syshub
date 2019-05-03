import {
  COMMENTS_FIRE_COLLECTION,
  C_REPLIES_FIRE_COLLECTION,
  fire
} from './firebase';

/**
 *
 * @param {string} pid = proposal ID
 */
export const getProposalComments = async (pid, sortAsc) => {
  const commentsRef = fire.database().ref(`${COMMENTS_FIRE_COLLECTION}/${pid}`);
  const rawComments = await commentsRef.once('value');
  const commentsListObj = await rawComments.val();
  if (commentsListObj) {
    Object.getOwnPropertyNames(commentsListObj).forEach((key, idx, array) => {
      commentsListObj[key]._id = key;
      commentsListObj[key].showAddReply = false;
    });
  }
  const commentsArray = commentsListObj ? Object.values(commentsListObj) : [];
  if (sortAsc) {
    commentsArray.sort(function(a, b) {
      return a.createdAt - b.createdAt;
    });
  } else {
    commentsArray.sort(function(b, a) {
      return a.createdAt - b.createdAt;
    });
  }
  return commentsArray;
};

/**
 *
 * @param {string} pid = proposal ID
 * @param {string} comment = comment Object to be added
 */
export const addProposalComments = async (pid, comment) => {
  const commentsRef = fire.database().ref(`${COMMENTS_FIRE_COLLECTION}/${pid}`);
  await commentsRef.push(comment);
};

export const setProposalCommentsVote = async (pid, cid, item) => {
  // console.log('ACZ -->', pid, cid, item);
  const commentsRef = fire
    .database()
    .ref(`${COMMENTS_FIRE_COLLECTION}/${pid}/${cid}`);
  const rawComments = await commentsRef.set(item);
  return rawComments;
};

/**
 *
 * @param {string} cid = comment ID
 */
export const getProposalCommentsReply = async (cid, sortAsc) => {
  const repliesRef = fire.database().ref(`${C_REPLIES_FIRE_COLLECTION}/${cid}`);
  const rawReplies = await repliesRef.once('value');
  const repliesListObj = await rawReplies.val();
  /* if (repliesListObj) { 
    Object.getOwnPropertyNames(repliesListObj).forEach((key, idx, array) => {
      repliesListObj[key]._id = key;
      repliesListObj[key].showAddReply = false
    });
  }
  const commentsArray = repliesListObj ? Object.values(repliesListObj) : [];
  if (sortAsc) {
    commentsArray.sort(function(a, b) {return a.createdAt-b.createdAt});
  } else {
    commentsArray.sort(function(b, a) {return a.createdAt-b.createdAt});
  }
  return commentsArray; */
  return repliesListObj;
};

/**
 *
 * @param {string} cid = comment ID
 * @param {string} reply = comment Object to be added
 * @param {string} parentId = parent ID
 */
export const addProposalCommentsReply = async (cid, reply, parentId) => {
  const replyRef = fire.database().ref(`${C_REPLIES_FIRE_COLLECTION}/${cid}/`);
  const uniqueID = await replyRef.push(reply).key;
  if (parentId) {
    const parentRef = fire
      .database()
      .ref(`${C_REPLIES_FIRE_COLLECTION}/${cid}/${parentId}/child`);
    await parentRef.push(uniqueID);
  }
};
