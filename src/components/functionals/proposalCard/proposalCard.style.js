import palette from '../styles/palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;

export default {
  root: {
    height: '100%',
    marginTop: 20,
    '& .proposalRow': {
      maxWidth: 'calc(100% - 35px)',
      height: 160,
      margin: '5px 0 0 20px',
      backgroundColor: 'white',
      padding: '15px 0px',
      borderRadius: '10px',
      border: `1px solid ${gray}`,
      '&:hover': {
        border: `1px solid ${primaryLight}`,
      },
      '& .proposalProgressView': {
        textAlign: 'center',
      },
      '& .proposalInfoView': {
        borderRight: `1px solid ${gray}`,
        borderLeft: `1px solid ${gray}`,
        paddingLeft: '20px',
        height: '99%',
      },
      '& .proposalVoteView': {
        textAlign: 'center',
        paddingTop: 0,
      },
    }
  },
  mRoot: {
    extend: 'root',
    '& .proposalRow': {
      maxWidth: '100%',
      height: 300,
      margin: '5px 0 0 0px',
      backgroundColor: 'white',
      padding: '15px 0px',
      borderRadius: '10px',
      border: `1px solid ${gray}`,
      '&:hover': {
        border: `1px solid ${primaryLight}`,
      },
      '& .proposalProgressView': {
        textAlign: 'center',
      },
      '& .proposalInfoView': {
        borderTop: `1px solid ${gray}`,
        borderRight: `0px solid ${gray}`,
        borderLeft: `0px solid ${gray}`,
        margin: '10px 0 0 0',
        padding: '10px 0 0 10px',
        maxWidth: '95%',
      },
      '& .proposalVoteView': {
        textAlign: 'center',
        paddingTop: 0,
        borderLeft: `1px solid ${gray}`,
      },
    },
  },
};