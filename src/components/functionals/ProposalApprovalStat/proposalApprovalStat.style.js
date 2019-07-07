import palette from '../../../styles/palette';

const primary = palette.primary;
const primaryHover = palette.primaryHover;
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
    },
    '& .votingStringContainer': {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gridTemplateRows: 'auto 20px',
      justifyItems: 'center',
      alignItems: 'center',
      margin: '15px 0 0 29px',
      width: '100%'
    },
    '& .votingStringTitle': {
      margin: 0,
      color: primaryDark
    },
    '& .votingStringText': {
      margin: '0 0 0 12px',
      padding: '0 5px',
      fontFamily: 'Monaco, monospace !Important',
      fontSize: '12px',
      borderRadius: '5px',
      '&:hover': {
        background: primaryHover,
        color: primary,
        cursor: 'pointer'
      }
    }
  },
  mRoot: {
    extend: 'root',
    width: '100%',
    '& .progressContainer': {
      justifyItems: 'center',
      padding: '20px',
      width: '100%'
    },
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
    },
    '& .votingStringContainer': {
      gridTemplateColumns: 'auto',
      gridTemplateRows: 'auto 1fr 20px',
      justifyItems: 'start',
      overflow: 'hidden',
      textOverflow: 'ellipses',
      margin: '15px 0 0 0'
    }
  }
};
