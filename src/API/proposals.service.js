import { fire } from './firebase/firebase';
import { HTTPAsync } from '../redux/helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API DO IT IN ".env -> REACT_APP_SYS_MN_API"       */
/**---------------------------------------------------------------------------- */

const baseApiURL = process.env.REACT_APP_SYS_MN_API;

/**---------------------------------------------------------------------------- */

/**
 *
 * @param {actionType} Redux action type
 * @return an Object with a proposal list
 */
export const getProposalList = actionType => {
  return HTTPAsync.get(`${baseApiURL}/list`, null, actionType);
};

/**
 *
 * @param {params} parameters for the API call
 * @param {actionType} Redux action type
 * @return an Hex for the next step of proposal creation.
 */
export const checkProposal = (params, actionType) => {
  return HTTPAsync.post(`${baseApiURL}/check`, params, actionType);
};

/**
 *
 * @param {params} parameters for the API call
 * @param {actionType} Redux action type
 * @return an Hex for the next step of proposal creation.
 */
export const prepareProposal = (params, actionType) => {
  return HTTPAsync.post(`${baseApiURL}/prepare`, params, actionType);
};

/**
 *
 * @param {params} parameters for the API call
 * @param {actionType} Redux action type
 * @return an object with hash and txid.
 */
export const submitProposal = (params, actionType) => {
  return HTTPAsync.post(`${baseApiURL}/submit`, params, actionType);
};

export const voteOnProposal = (params, actionType) => {
  return HTTPAsync.post(`${baseApiURL}/vote`, params, actionType);
};

/**
 *
 * @param {uid} User ID
 * @return true if find a pending proposal for that user
 */
export const checkPendingProposal = uid => {
  const proposalRef = fire.database().ref('proposals/' + uid);
  return !!proposalRef;
};

/**
 *
 * @param {uid} User ID
 * @return the proposal object plus the description atached
 */
export const recoverPendingProposal = async uid => {
  const proposalRef = fire.database().ref(`proposals/${uid}`);
  const rawProposal = await proposalRef.once('value');
  const recoveredProposal = rawProposal.val();
  if (!recoveredProposal) {
    return false;
  }
  const descID = recoveredProposal.descriptionID;
  const descriptionRef = fire.database().ref(`proposalsDescriptions/${descID}`);
  const rawDescription = await descriptionRef.once('value');
  const recoveredDescription = rawDescription.val();
  recoveredProposal.descriptionRef = recoveredDescription;
  return recoveredProposal;
};

/**
 *
 * @param {uid} User ID
 * remove all register even the description detail
 */
export const deletePendingProposal = async uid => {
  const proposalRef = fire.database().ref(`proposals/${uid}`);
  const rawProposal = await proposalRef.once('value');
  const recoveredProposal = rawProposal.val();
  if (proposalRef) {
    const descID = recoveredProposal.descriptionID;
    const descriptionRef = fire
      .database()
      .ref(`proposalsDescriptions/${descID}`);
    const rawDescription = await descriptionRef.once('value');
    const recoveredDescription = rawDescription.val();
    if (!recoveredDescription.hash) {
      descriptionRef.remove();
    }
  }
  proposalRef.remove();
};

/**
 *
 * @param none
 * @returns the next reward date
 */

export const nextGovernanceRewardDate = async () => {
  const chainInfo = await HTTPAsync.onlyGet(`${baseApiURL}/getinfo`, null);
  const governanceInfo = await HTTPAsync.onlyGet(
    `${baseApiURL}/getgovernanceinfo`,
    null
  );
  const blockHeight = chainInfo.blocks; // 323687;
  const nextSuperBlock = governanceInfo.nextsuperblock;
  const blockGenerationCycle = 63; // Defined by the chain White_paper doc.
  const votingDeadlineGap = -3;

  // manual Next Super Block Calculation
  // const superBlockCycle = governanceInfo.superblockcycle;
  // const nextSB = superBlockCycle * (parseInt(blockHeight / superBlockCycle, 10) + 1);

  const date = new Date();
  const nextRewardInSeconds =
    blockGenerationCycle * (nextSuperBlock - blockHeight);
  date.setSeconds(nextRewardInSeconds);
  var rewardDate = date.toDateString();
  date.setDate(date.getDate() + votingDeadlineGap);
  var votingDeadline = date.toDateString();
  return { rewardDate, votingDeadline };
};
