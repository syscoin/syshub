import { HTTPAsync } from '../../redux/helpers';

/**---------------------------------------------------------------------------- */
/** TO CHANGE THE URL FOR THE API DO IT IN ".env -> REACT_APP_SYS_MN_API"       */
/**---------------------------------------------------------------------------- */

const baseApiURL = process.env.REACT_APP_SYS_MN_API;

/**---------------------------------------------------------------------------- */

const BLOCK_GENERATION_CYCLE_SECONDS = 60;
const VOTING_DEADLINE_GAP_DAYS = 3;

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
  const { nextsuperblock, superblockcycle } = governanceInfo;
  //const blockGenerationCycle = 63; // Defined by the chain White_paper doc.
  const blockGenerationCycle = BLOCK_GENERATION_CYCLE_SECONDS; // Defined by the chain White_paper doc.
  const votingDeadlineGap = VOTING_DEADLINE_GAP_DAYS;

  // manual Next Super Block Calculation
  // const superBlockCycle = governanceInfo.superblockcycle;
  // const nextSB = superBlockCycle * (parseInt(blockHeight / superBlockCycle, 10) + 1);

  const superblockCycleEpoch = superblockcycle * blockGenerationCycle;
  const date = new Date();
  const nextRewardInSeconds =
    blockGenerationCycle * (nextsuperblock - blockHeight);
  date.setSeconds(nextRewardInSeconds);
  const rewardDateEpoch = Math.round(date.getTime() / 1000);
  const rewardDate = date.toDateString();
  date.setDate(date.getDate() - votingDeadlineGap);
  const votingDeadLineEpoch = Math.round(date.getTime() / 1000);
  const votingDeadline = date.toDateString();
  return {
    rewardDate,
    votingDeadline,
    rewardDateEpoch,
    votingDeadLineEpoch,
    superblockCycleEpoch
  };
};

export const calculatePaymentDates = async (
  nPayment,
  startEpoch,
  endEpoch,
  firstEpoch
) => {
  const dates = [];
  const nowEpoch = Math.round(new Date().getTime() / 1000);
  const chainInfo = await HTTPAsync.onlyGet(`${baseApiURL}/getinfo`, null);
  const governanceInfo = await HTTPAsync.onlyGet(
    `${baseApiURL}/getgovernanceinfo`,
    null
  );
  const { blocks } = chainInfo; // 323687;
  const { lastsuperblock, nextsuperblock, superblockcycle } = governanceInfo; // 323687;

  const superBlocksGapSeconds =
    superblockcycle * BLOCK_GENERATION_CYCLE_SECONDS;

  const nextSuperBlockGapSeconds =
    (nextsuperblock - blocks) * BLOCK_GENERATION_CYCLE_SECONDS;
  const lastSuperBlockGapSeconds =
    (blocks - lastsuperblock) * BLOCK_GENERATION_CYCLE_SECONDS;
  //const votingDeadlinesGap = VOTING_DEADLINE_GAP_DAYS * 24 * 60 * 60;
  const votingDeadlinesGap = 3 * 24 * 60 * 60;
  const nextSuperBlockEpoch = nowEpoch + nextSuperBlockGapSeconds;
  const lastSuperBlockEpoch = nowEpoch - lastSuperBlockGapSeconds;

  // calculate previous SuperBlocks
  dates.unshift(lastSuperBlockEpoch);
  while (startEpoch <= dates[0] - votingDeadlinesGap) {
    const previousSuperBlock = dates[0] - superBlocksGapSeconds;
    dates.unshift(previousSuperBlock);
  }
  dates.shift();
  if (dates.length === 0) {
    dates.unshift(nextSuperBlockEpoch);
  }

  while (endEpoch >= dates[dates.length - 1]) {
    const nextSuperBlock = dates[dates.length - 1] + superBlocksGapSeconds;
    dates.push(nextSuperBlock);
  }
  dates.pop();

  return dates;
};
