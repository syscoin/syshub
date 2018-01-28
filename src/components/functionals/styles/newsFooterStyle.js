import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;

export default {
  root: {
    margin: '20px 0 20px 0',
    '& .info': {
      width: 'calc(100% - 120px)',
      display: 'inline-block',
      marginLeft: 20,
      verticalAlign: 'top',
      '& .title': {
        fontWeight: 'bold',
        fontSize: 20,
      },
      '& .sub-title': {
        color: primary,
        fontWeight: 100,
      },
    },
    '& button': {
      backgroundColor: primary,
      marginRight: 10,
      border: 0,

      '& span': {
        color: white,
      },
      '&:hover': {
        backgroundColor: primaryLight,
        border: 0,
      },
      '& i': {
        color: white,
      },
    },
  },
  thumbnil: {
    height: 80,
    width: 80,
  },
};
