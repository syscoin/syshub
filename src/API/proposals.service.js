import { fire } from './firebase';
import { HTTPAsync } from '../redux/helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API DO IT IN ".env -> REACT_APP_SYS_MN_API"       */
/**---------------------------------------------------------------------------- */

const baseApiURL = process.env.REACT_APP_SYS_MN_API;

/**---------------------------------------------------------------------------- */


/**
 * 
 * @param {uid} User ID
 * @return true if find a pending proposal for that user 
 */
export const checkPendingProposal = (uid) => {
  const proposalRef = fire.database().ref('proposals/' + uid);
  return !!proposalRef;
};

/**
 * 
 * @param {uid} User ID
 * @return the proposal object plus the description atached  
 */
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

/**
 * 
 * @param {uid} User ID
 * remove all register even the description detail 
 */
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

/**
 * 
 * @param none
 * @returns the next reward date
 */

export const nextGovernanceRewardDate = async () => {
  const chainInfo = await HTTPAsync.onlyGet(`${baseApiURL}/getinfo`,null,);
  const blockHeight =  chainInfo.blocks; // 323687;
  const sixtyThree = 63;
  const fortyThreeThousand = 43800;
  const date = new Date();
  const nextRewardInSeconds = sixtyThree * (fortyThreeThousand * (parseInt(blockHeight / fortyThreeThousand, 10) + 1) - blockHeight);
  date.setSeconds(nextRewardInSeconds);
  var nextRewardDate = date.toDateString();
  return nextRewardDate;
}
