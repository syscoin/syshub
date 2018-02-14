import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;

export default {
  root: {
    height: '100%',
    marginTop: 20,
    '& .proposalRow': {
      maxWidth: 'calc(100% - 35px)',
      height: 150,
      margin: '5px 0 0 20px',
      backgroundColor: 'white',
      padding: '15px 0px',
      borderRadius: '10px',
      border: '2px solid ghostwhite',
      '& .proposalView': {
        textAlign: '-webkit-center',
        '& .progress-dial': {
          // width:"100px",
          '& .ant-progress-inner': {
            width: '100px !important',
            height: '92px !important',
            fontSize: '20px !important',
            '& .progressIcon': {
              width: '50px',
              height: '50px',
            },
          },
        },
        '& .proposalStatusNo': {
          color: gray,
          marginTop: '10px',
        },
        '& .proposalStatusActiveNo': {
          color: '#1890ff',
        },
        '& .proposalStatusExecptionNo': {
          color: 'red'
        },
        '& .proposalStatusSuccessNo': {
          color: '#2ecc71'
        }
      },
      '& .proposalInfoView': {
        borderRight: '1px solid ' + gray,
        borderLeft: '1px solid ' + gray,
        paddingLeft: '20px',
        height: '99%',
        '& .voteButton': {
          border: 'none',
          textAlign: 'right',
          background: primaryDark,
          borderWidth: '1px 0 0 0',
          borderStyle: 'solid',
          borderColor: primaryDark,
          float: 'right',
          padding: '5px',
          color: primaryLight,
          borderRadius: '5px',
          padding: '5px 10px',
          marginRight: '10px',
          '& span': {
            color: white,
          },
        },
        '& .activeVoteButton': {
          border: 'none',
          textAlign: 'right',
          background: primaryDark,
          borderStyle: 'solid',
          float: 'right',
          padding: '5px',
          borderRadius: '5px',
          padding: '5px 10px',
          backgroundColor: white,
          color: primaryLight,
          borderColor: primaryDark,
          borderWidth: '2px',
          marginRight: '10px',
        },
        '& .proposalHeading': {
          color: primaryDark,
          margin: 0,
          cursor: 'pointer',
        },
        '& .proposalDetail': {
          color: gray,
          marginTop: '5px',
          fontSize: '15px',
        },
      },
      '& .top-vote__wrapper': {
        textAlign: 'center',
        paddingTop: 0,
        '& .vote-text': {
          color: primaryDark,
        },
        '& .vote-up, .vote-down': {
          maxWidth: 60,
          width: '100%',
          display: 'inline-block',
          margin: 0,
          border: 'thin solid' + greyLight,
          padding: 5,
          height: 60,
          '& img': {
            height: '100%',
          },
        },

        '& .vote-number': {
          color: gray,
          fontSize: 20,
          display: 'inline-block',
          verticalAlign: 'middle',
          marginTop: 5,
          maxWidth: 60,
          width: '100%',
        },
        '& .smallUpVoteIcon': {
          width: '20px',
          height: '25px',
          marginLeft: '50px',
          marginRight: '10px',
        },
        '& .smallDownVoteIcon': {
          width: '20px',
          height: '25px',
          marginLeft: '40px',
          marginRight: '10px',
        },
        '& .votesIconView': {
          '& .upVoteIcon': {
            width: '30px',
            height: '40px',
            marginLeft: '23%',
            marginRight: '6%',
          },
          '& .downVoteIcon': {
            width: '30px',
            height: '40px',
            marginLeft: '18%',
          },
        },
        '& .votesNoView': {
          display: '-webkit-inline-box',
          '& .voteNumber': {
            color: gray,
            fontSize: '20px',
            padding: '10px 10px 0px 54px',
          },
        },
      },
      '& .vote__wrapper': {
        textAlign: 'center',
        marginTop: 35,
        '& .vote-up, .vote-down': {
          paddingBottom: 15,
          width: 60,
          display: 'inline-block',
        },
        '& img': {
          height: 30,
          marginRight: 5,
          verticalAlign: 'middle',
        },
      },
    },
  },
  mRoot: {
    extend: 'root',
    '& .proposalRow': {
      maxWidth: '100%',
      // minWidth :'calc(100% + 110px)',
      height: 150,
      margin: '5px 0 0 0px',
      backgroundColor: 'white',
      padding: '15px 0px',
      borderRadius: '10px',
      border: '2px solid ghostwhite',
      '& .proposalView': {
        textAlign: '-webkit-center',
        '& .progress-dial': {
          // width:"100px",
          '& .ant-progress-inner': {
            width: '80px !important',
            height: '80px !important',
            fontSize: '20px !important',
            '& .progressIcon': {
              width: '40px',
              height: '43px',
            },
          },
        },
      },
      '& .proposalInfoView': {
        borderRight: '1px solid ' + gray,
        borderLeft: '1px solid ' + gray,
        paddingLeft: '10px',
        height: '99%',
        // minWidth: 'calc(100% - 195px)',
        '& .voteButton': {
          border: 'none',
          textAlign: 'right',
          background: primaryDark,
          borderWidth: '1px 0 0 0',
          borderStyle: 'solid',
          borderColor: primaryDark,
          float: 'right',
          padding: '5px',
          color: primaryLight,
          borderRadius: '5px',
          padding: '5px 10px',
          marginRight: '10px',
          '& span': {
            color: white,
          },
        },
        '& .proposalHeading': {
          color: primaryDark,
          margin: 0,
          cursor: 'pointer',
          fontSize: 24,
          whiteSpace: 'nowrap',
          maxWidth: '10em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minWidth: '6em',
        },
        '& .proposalDetail': {
          color: gray,
          marginTop: '5px',
          fontSize: '13px',
        },
      },
      '& .top-vote__wrapper': {
        textAlign: 'center',
        paddingTop: 0,
        minWidth: 90,
        '& .vote-text': {
          color: primaryDark,
        },
        '& .vote-up, .vote-down': {
          display: 'inline-block',
          margin: 0,
          border: 'thin solid' + greyLight,
          padding: 5,
          height: 40,
          width: '50%',
          '& img': {
            height: '100%',
          },
        },
        '& .login-vote-up, .login-vote-down': {
          display: 'inline-block',
          margin: 0,
          border: 'thin solid' + greyLight,
          padding: 5,
          height: 40,
          width: '50%',
          '& img': {
            height: '100%',
          },
        },
        '& .vote-number': {
          color: gray,
          fontSize: 20,
          display: 'inline-block',
          verticalAlign: 'middle',
          marginTop: 5,
          maxWidth: 60,
          width: '50%',
        },
      },
      '& .vote__wrapper': {
        textAlign: 'center',
        marginTop: 10,
        '& .vote-up, .vote-down': {
          width: 60,
          display: 'inline-block',
        },
        '& img': {
          height: 30,
          marginRight: 5,
          verticalAlign: 'middle',
        },
      },
    },
  },

}
