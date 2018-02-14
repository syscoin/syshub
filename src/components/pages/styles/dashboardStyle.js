import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const grey = palette.greyDark;
export default {
  root: {
    '& .dashBoardheading': {
      fontWeight: 'lighter',
    },
    '& .iconWraper': { fontSize: 14, cursor: 'pointer' },
    '& .icon': { color: primary },
    '& .iconTxt': { color: primary },
  },
  mRoot: {
    extend: 'root',
    '& .proposal-heading': {
      padding: 15,
      fontSize: 25,
      backgroundColor: white,
      color: grey,
      fontWeight: 300,
    },
    '& .dashBoardheading': {
      fontWeight: 'lighter',
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
