import constants from "../constants";

const initialState = {
  cards: [
    {
      img: "png_stasts_sys.png",
      key: "changeRate",
      text: ["USD", "BTC", "SATOSHI"]
    },
    {
      img: "png_stats_gov.png",
      key: "governance",
      text: [
        "GOVERNANCE INFO",
        [
          "Next Payout Date",
          "Block Height",
          "Voting Deadline",
          "Governance Available"
        ]
      ]
    },
    {
      img: "png_menu_masternodes_selected.png",
      key: "masternodes",
      text: ["REGISTERED MASTERNODES"]
    },
    {
      img: "png_stats_users.png",
      key: "totUsers",
      text: ["ALL USERS"]
    }
  ],
  totMn: 0,
  regMn: 0,
  users: 0
};

/*
Payout date,
Governance available,
Voting Deadline,
Active Proposals,
*/

function smartParse(json, def) {
  if (typeof json === "object") return json;
  try {
    return JSON.parse(json);
  } catch (e) {
    return def;
  }
}

const sysStats = (state = initialState, action) => {
  switch (action.type) {
    case constants.SYS_STATS_PRICE_GET: {
      const sysPrice = smartParse(action.data, []);
      // console.log("ACZ sysPrice -->", sysPrice);
      return { ...state, sysPrice };
    }
    case constants.SYS_STATS_TMN_GET: {
      return { ...state, mnCount: action.data };
    }
    case constants.SYS_STATS_RMN_GET: {
      return { ...state, mnRegistered: action.data };
    }
    case constants.SYS_STATS_USER_GET: {
      return { ...state, users: action.data };
    }
    default:
      return state;
  }
};

export default sysStats;
