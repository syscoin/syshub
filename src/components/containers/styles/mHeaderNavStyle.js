import palette from './palette';

const primary = palette.primary;
const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gery = palette.grey;

export default {
  mRoot: {
    borderTop: 'thin solid ' + gery,
    marginTop: 25,
    marginBottom: 0,
    '& .left-section': {
      textAlign: 'center',
      padding: 0,
    },
    '& .divider': {
      height: '100%',
      margin: 0
    },
    '& .center-section': {
      textAlign: 'center',
      borderLeft: 'thin solid ' + gery,
      borderRight: 'thin solid ' + gery,
      '& img': {
        height: 50,
        marginBottom: 10
      }
    },
    '& .right-section': {
      padding: 0,
      textAlign: 'center',
    },
    '& button': {
      border: 'none'
    }
  }
};
