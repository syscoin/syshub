import palette from './palette';
import { colors } from 'material-ui/styles';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;
const greyDark = palette.greyDark;

export default {
  root: {
    '& .no-margin': {
      margin: 0,
      '& .heading': {
        fontSize: 20,
        color: greyDark,
      },
    },
    '& .approvalStatus': {
      margin: 0,
      marginTop: 60,
      '& .heading': {
        fontSize: 20,
        color: greyDark,
        fontWeight: 200,
      },
    },
    '& .topApprovalView': {
      margin: 0,
      marginTop: 40,
      '& .approvalKey': {
        marginLeft: '4%',
        padding: 0,
        color: primaryDark,
        fontSize: 16,
      },
      '& .approvalValue': {
        color: greyDark,
        fontSize: 16,
        padding: 0,
        display: '-webkit-box',
        '& .approvalRedColorFont': {
          color: 'red',
        },
        '& .voteRedColorFont': {
          color: 'red',
          marginRight: '6%',
        },
        '& .voteGreenColorFont': {
          color: 'green',
          marginRight: '6%',
        },
      },
    },
    '& .approvalView': {
      margin: 0,
      marginTop: 15,
      '& .approvalKey': {
        marginLeft: '4%',
        padding: 0,
        color: primaryDark,
        fontSize: 16,
      },
      '& .approvalValue': {
        color: greyDark,
        fontSize: 16,
        padding: 0,
        display: '-webkit-box',
        '& .approvalRedColorFont': {
          color: 'red',
        },
        '& .voteRedColorFont': {
          color: 'red',
          marginRight: '6%',
        },
        '& .voteGreenColorFont': {
          color: 'green',
          marginRight: '6%',
        },
      },
    },
  },
  mRoot: { extend: 'root' },
};
