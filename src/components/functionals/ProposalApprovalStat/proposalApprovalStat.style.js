import palette from '../../../styles/palette';

const primaryDark = palette.primaryDark;
const greyDark = palette.greyDark;
const green = palette.green;
const red = palette.red;

export default {
  root: {
    '& .progressContainer': {
      display: 'grid',
      gridTemplateColumns: 'auto',
      gridTemplateRow: 'auto',
      justifyItems: 'start',
      alignItems: 'end',
      padding: '0 0 5px 20px',
      width: '100%'
    },
    '& .no-margin': {
      margin: 0,
      '& .heading': {
        fontSize: 20,
        color: greyDark
      }
    },
    '& .approvalStatus': {
      margin: 0,
      marginTop: 60,
      '& .heading': {
        fontSize: 20,
        color: greyDark,
        fontWeight: 200
      }
    },
    '& .topApprovalView': {
      margin: 0,
      marginTop: 40,
      '& .approvalKey': {
        marginLeft: '4%',
        padding: 0,
        color: primaryDark,
        fontSize: 16
      },
      '& .approvalValue': {
        color: greyDark,
        fontSize: 16,
        padding: 0,
        display: '-webkit-box',
        '& .approvalRedColorFont': {
          color: red
        },
        '& .approvalColorFont': {
          '&.funded': {
            color: green
          },
          '&.passing': {
            color: primaryDark
          },
          '&.unfunded': {
            color: red
          }
        },
        '& .voteRedColorFont': {
          color: red,
          marginRight: '6%'
        },
        '& .voteGreenColorFont': {
          color: green,
          marginRight: '6%'
        }
      }
    },
    '& .approvalView': {
      margin: 0,
      marginTop: 15,
      '& .approvalKey': {
        marginLeft: '4%',
        padding: 0,
        color: primaryDark,
        fontSize: 16
      },
      '& .approvalValue': {
        color: greyDark,
        fontSize: 16,
        padding: 0,
        display: '-webkit-box',
        '& .approvalRedColorFont': {
          color: red
        },
        '& .voteRedColorFont': {
          color: red,
          marginRight: '6%'
        },
        '& .voteGreenColorFont': {
          color: green,
          marginRight: '6%'
        }
      }
    }
  },
  mRoot: {
    extend: 'root',
    width: '100%',
    '& .approvalStatus': {
      '& .heading': {
        '&>p': {
          fontSize: 20
        }
      }
    },
    '& .topApprovalView': {
      marginTop: 0,
      width: '100%',
      '& .approvalKey': {
        marginLeft: 0,
        width: '30%'
      }
    },
    '& .approvalView': {
      '& .approvalKey': {
        marginLeft: 0,
        width: '30%'
      }
    }
  }
};
