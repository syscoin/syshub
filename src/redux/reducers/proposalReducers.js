import constants from '../constants';
//import { fire } from '../../API/firebase';

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

      //if (Array.isArray(proposal[key2])) {
      //  const dataString = proposal[key2][0][1]
      //  const descriptionID = dataString.descriptionID;
      //  dataString.description = fire.database().ref('ProposalsDescriptions/' + descriptionID).once('value', snapshot => snapshot.val());
      //  proposal[key2].DataString = dataString;
      //  //console.log('ACZ: ', key2, descriptionID, description)
      //
      //}

      return {
        ...state,
        listRaw: action.data,
        list: list
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
