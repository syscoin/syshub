import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;

export default {
  proposalPaymentRoot: {
    '& .no-margin': {
      margin: 0,
      '& .heading': {
        fontSize: 20,
        color: greyDark
      },
    },
    "& .paymentsView": {
      margin: 0,
      marginTop: 30,
      "& .OnTimePaymentView": {
        flexBasis: "35% !important",
        maxWidth: "26.6%",
        padding: 0,
        marginLeft: "4%",
        fontSize: 14,
        "& .heading": {
          color: gray,
          fontSize: 14,
          marginBottom: 2,
        },
        "& .form": {
          "& .FormGroup": {
            "& .input-field": {
              color: primaryLight,
              padding: 5,
              border:"1px solid " + gray,

            },
            "& .input-field::-webkit-input-placeholder": { /* Chrome/Opera/Safari */
              color: primaryLight,
            },
            "& .input-field::-moz-placeholder": { /* Firefox 19+ */
              color: primaryLight,
            },
            "& .input-field:-ms-input-placeholder": { /* IE 10+ */
              color: primaryLight,
            },
            "& .input-field:-moz-placeholder": { /* Firefox 18- */
              color: primaryLight,
            }
          }
        }
      },

    },
    '& .approvalStatus': {
      margin: 0,
      marginTop: 100,
      '& .heading': {
        fontSize: 20,
        color: greyDark
      },
    },
    "& .topApprovalView": {
      margin: 0,
      marginTop: 40,
      "& .approvalKey": {
        marginLeft: "4%",
        padding: 0,
        color: primaryDark,
        fontSize: 16,
      },
      "& .approvalValue": {
        color: greyDark,
        fontSize: 16,
        padding: 0,
        display: "-webkit-box",
        "& .approvalRedColorFont": {
          color: "red",
        },
        "& .voteRedColorFont": {
          color: "red",
          marginRight: "6%",
        },
        "& .voteGreenColorFont": {
          color: "green",
          marginRight: "6%",
        },


      }

    },
    "& .approvalView": {
      margin: 0,
      marginTop: 15,
      "& .approvalKey": {
        marginLeft: "4%",
        padding: 0,
        color: primaryDark,
        fontSize: 16,
      },
      "& .approvalValue": {
        color: greyDark,
        fontSize: 16,
        padding: 0,
        display: "-webkit-box",
        "& .approvalRedColorFont": {
          color: "red",
        },
        "& .voteRedColorFont": {
          color: "red",
          marginRight: "6%",
        },
        "& .voteGreenColorFont": {
          color: "green",
          marginRight: "6%",
        },


      }

    },
    "& .proposalView": {
      margin: 0,
      marginTop: 15,
      "& .proposalDetails": {
        marginLeft: "4%",
        padding: 0,
        color: gray,
        maxWidth: "89.6667%",
        fontSize: 15
      },

    },

    "& .commentSectionslView": {
      margin: 0,
      marginLeft: "4%",
      marginTop: 40,
      borderRadius: 5,
      background: "rgb(240, 242, 245)",
      height: "30%",
      "& .commentHeading": {
        color: greyDark,
        padding:"10px 28px",
        fontWeight: 500,
      },
      "& .proposalDetails": {
        marginLeft: 8,
        padding: 0,
        color: gray,
        maxWidth: "89.6667%",
        fontSize: 15,
        background: white,
        maxWidth: "100%",
        padding: "10px 20px",
        height: "70%",

      },

    },


  }
};
