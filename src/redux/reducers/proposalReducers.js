import constants from '../constants';

const initialState = {
  listRaw: {},
  list: [],
  firstPaymentDate: new Date('2018-01-03').getTime(), // YYY-MM-DD
  millsMonth: 30 * 24 * 60 * 60 * 1000,
  checkStatus: null,
  prepareReceipt: null,
  submitReceipt: null,
  voteStatus: null
};

function smartParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return json;
  }
}

const proposals = (state = initialState, action) => {
  switch (action.type) {
    case constants.SYS_PROPOSALS_GET: {
      let proposal = {};
      let list = [];

      Object.keys(action.data).forEach(key1 => {
        Object.keys(action.data[key1]).forEach(key2 => {
          proposal[key2] = smartParse(action.data[key1][key2]);
        });
        list.push(proposal);
        proposal = {};
      });

      return {
        ...state,
        listRaw: action.data,
        list: list.sort((a, b) => b.CreationTime - a.CreationTime)
      };
    }

    case constants.SYS_PROPOSALS_CHECK:
      return { ...state, checkStatus: action.data };

    case constants.SYS_PROPOSALS_PREPARE:
      return { ...state, prepareReceipt: action.data };

    case constants.SYS_PROPOSALS_SUBMIT:
      return { ...state, submitReceipt: action.data };

    case constants.SYS_PROPOSAL_VOTE:
      return { ...state, voteStatus: action.data };

    default:
      return state;
  }
};

export default proposals;
