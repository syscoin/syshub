import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const grey = palette.greyDark;
export default {
  root: {
    '& .proposal-heading': {
      color: grey,
      textTransform: 'uppercase',
      padding: 15,
      fontWeight: 300,
      margin: 'auto',
    },
    '& .iconWraper': { fontSize: 14, cursor: 'pointer' },
    '& .icon': { color: primary },
    '& .iconTxt': { color: primary },
  },
  mRoot: {
    extend: 'root',
    '& .proposal-heading': {
    },
    '& .dashBoardheading': {
      fontWeight: 'normal',
      margin: 'auto',
      padding: 15,
      backgroundColor: white,
    },
    '& .iconWraper': {
      backgroundColor: white,
      padding: '0px 5px',
    }
  }
};
