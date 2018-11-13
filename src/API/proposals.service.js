import { fire } from './firebase';

/**
 * 
 * @param {uid} User ID
 * @return true if find a pending proposal for that user 
 */
export const checkPendingProposal = (uid) => {
  const proposalRef = fire.database().ref('proposals/' + uid);
  return !!proposalRef;
};

export const recoverPendingProposal = async (uid) => {
  const proposalRef = fire.database().ref('proposals/' + uid);
  console.log('ACZ --> 1');
  const snapshot = await proposalRef.once('value');
  console.log('ACZ --> 2');
  return snapshot.val();
}
