import palette from '../../../styles/palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const white = palette.white;

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
  mRoot: { extend: 'root' },
};
