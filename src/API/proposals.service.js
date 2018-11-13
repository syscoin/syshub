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
  const proposalRef = fire.database().ref(`proposals/${uid}`);
  const rawProposal = await proposalRef.once('value');
  const recoveredProposal = rawProposal.val();
  if (!recoveredProposal) { return false };
  const descID = recoveredProposal.descriptionID;
  const descriptionRef = fire.database().ref(`proposalsDescriptions/${descID}`);
  const rawDescription = await descriptionRef.once('value');
  const recoveredDescription = rawDescription.val();
  recoveredProposal.descriptionRef = recoveredDescription;
  return recoveredProposal;
}

export const deletePendingProposal = async (uid) => {
  const proposalRef = fire.database().ref(`proposals/${uid}`);
  const rawProposal = await proposalRef.once('value');
  const recoveredProposal = rawProposal.val();
  if (proposalRef) {
  const descID = recoveredProposal.descriptionID;
  const descriptionRef = fire.database().ref(`proposalsDescriptions/${descID}`);
  descriptionRef.remove();
}
  proposalRef.remove();
}
