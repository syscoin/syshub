import palette from '../styles/palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;

export default {
  root: {
    '& .proposalHeading': {
      color: primaryDark,
      margin: 0,
      cursor: 'pointer'
    },
    '& .proposalDetail': {
      color: gray,
      marginTop: '5px',
      fontSize: '15px'
    }
  }
}