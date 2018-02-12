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
      marginLeft:20
    },
  }
};
