import constants from '../constants';

const initialState = {
  listRaw: {
    f221880ff80918208d16613b0f7d66f05de3a4f5d0499465f692eee8469c6369: {
      DataHex:
        '5b5b2270726f706f73616c222c7b226e616d65223a225468726966615f46697273745f50726f706f73616c222c2274797065223a312c2273746172745f65706f6368223a313531363132373538392c22656e645f65706f6368223a313531383830353931342c227061796d656e745f61646472657373223a22545135456f31636332695971357a6756383351596161615132374b6971586e644157222c227061796d656e745f616d6f756e74223a313030302c2275726c223a2268747470733a2f2f7777772e7468726966612e696f227d5d5d',
      DataString:
        '[["proposal",{"name":"Thrifa_First_Proposal","type":1,"start_epoch":1516127589,"end_epoch":1518805914,"payment_address":"TQ5Eo1cc2iYq5zgV83QYaaaQ27KiqXndAW","payment_amount":1000,"url":"https://www.thrifa.io"}]]',
      Hash: 'f221880ff80918208d16613b0f7d66f05de3a4f5d0499465f692eee8469c6369',
      CollateralHash: '79f6c080a9baccd438b2dcb96bb4d8c15671213433525449120d6af1155aa96e',
      ObjectType: 1,
      CreationTime: 1516127692,
      AbsoluteYesCount: 1,
      YesCount: 1,
      NoCount: 0,
      AbstainCount: 0,
      fBlockchainValidity: true,
      IsValidReason: '',
      fCachedValid: true,
      fCachedFunding: false,
      fCachedDelete: false,
      fCachedEndorsed: false
    },
    '4bc087b56f993a44a89be707333dc52d19279bd8e0f9f425b19c16f782eaf0d7': {
      DataHex:
        '5b5b2270726f706f73616c222c7b226e616d65223a225468726966615f74687265655f50726f706f73616c222c2274797065223a312c2273746172745f65706f6368223a313531363132373538392c22656e645f65706f6368223a313531383830353931342c227061796d656e745f61646472657373223a22545135456f31636332695971357a6756383351596161615132374b6971586e644157222c227061796d656e745f616d6f756e74223a313030302c2275726c223a2268747470733a2f2f7777772e7468726966612e696f227d5d5d',
      DataString:
        '[["proposal",{"name":"Thrifa_three_Proposal","type":1,"start_epoch":1516127589,"end_epoch":1518805914,"payment_address":"TQ5Eo1cc2iYq5zgV83QYaaaQ27KiqXndAW","payment_amount":1000,"url":"https://www.thrifa.io"}]]',
      Hash: '4bc087b56f993a44a89be707333dc52d19279bd8e0f9f425b19c16f782eaf0d7',
      CollateralHash: '32934db6764208652b12e48bd17985e3d46eda7306f916211ebdfcd1e6ade7ac',
      ObjectType: 1,
      CreationTime: 1516133620,
      AbsoluteYesCount: 0,
      YesCount: 0,
      NoCount: 0,
      AbstainCount: 0,
      fBlockchainValidity: true,
      IsValidReason: '',
      fCachedValid: true,
      fCachedFunding: false,
      fCachedDelete: false,
      fCachedEndorsed: false
    }
  },
  list: [],
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
    case constants.SYS_PROPOSALS_GET:
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
        list: list
      };

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
