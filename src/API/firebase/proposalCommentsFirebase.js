import { fire } from './firebase';



/**
 * 
 * @param {string} pid = proposal ID
 */
export const getProposalComments = async (pid, sortAsc) => {
  const commentsRef = fire.database().ref(`comments/${pid}`);
  const rawComments = await commentsRef.once('value');
  const commentsListObj = await rawComments.val();
  Object.getOwnPropertyNames(commentsListObj).forEach((key, idx, array) => {
    commentsListObj[key]._id = key;
    commentsListObj[key].showAddReply = false
  });
  const commentsArray = commentsListObj ? Object.values(commentsListObj) : [];
  if (sortAsc) {
    commentsArray.sort(function(a, b){return a.createdAt-b.createdAt});
  } else {
    commentsArray.sort(function(b, a){return a.createdAt-b.createdAt});
  }
  return commentsArray;
};