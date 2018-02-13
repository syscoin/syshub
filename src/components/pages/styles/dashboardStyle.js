import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

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
    // padding:0,
    '& .dashBoardheading': {
      fontWeight: 'lighter',
      margin: 'auto',
      padding: 15,
      backgroundColor: white,
    },
    '& .iconWraper': {
      backgroundColor: white,
      padding: '0px 10px',
    }
  }
};
