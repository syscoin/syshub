import { fire } from './firebase';

const commentsNode = 'comments';
// const repliesNode = 'commentReplies_V2';

/**
 * 
 * @param {string} pid = proposal ID
 */
export const getProposalComments = async (pid, sortAsc) => {
  const commentsRef = fire.database().ref(`${commentsNode}/${pid}`);
  const rawComments = await commentsRef.once('value');
  const commentsListObj = await rawComments.val();
  if (commentsListObj) { 
    Object.getOwnPropertyNames(commentsListObj).forEach((key, idx, array) => {
      commentsListObj[key]._id = key;
      commentsListObj[key].showAddReply = false
    });
  }
  const commentsArray = commentsListObj ? Object.values(commentsListObj) : [];
  if (sortAsc) {
    commentsArray.sort(function(a, b) {return a.createdAt-b.createdAt});
  } else {
    commentsArray.sort(function(b, a) {return a.createdAt-b.createdAt});
  }
  return commentsArray;
};


/**
 * 
 * @param {string} pid = proposal ID
 * @param {string} comment = comment Object to be added
 */
export const addProposalComments = async (pid, comment) => {
  const commentsRef = fire.database().ref(`${commentsNode}/${pid}`);
  const rawComments = await commentsRef.push(comment);
  console.log('ACZ --> ', rawComments);
};