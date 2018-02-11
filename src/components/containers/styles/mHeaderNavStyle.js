import palette from './palette';

const primary = palette.primary;
const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gery = palette.grey;

export default {
  mRoot: {
    borderTop: 'thin solid ' + gery,
    marginBottom: 0,
    marginTop: 0,
    '& .left-section': {
      textAlign: 'center',
      padding: 0,
      height: 45,
      borderRight: 'thin solid ' + gery,
      '& button': {
        height: 30,
        marginTop: -15
      }
    },
    '& .divider': {
      height: '100%',
      margin: 0
    },
    '& .center-section': {
      textAlign: 'center',
      height: 50,
      '& img': {
        height: 40,
        width: 70,
        marginTop: -29
      }
    },
    '& .right-section': {
      padding: 0,
      textAlign: 'center',
      height: 47,
      borderLeft: 'thin solid ' + gery,
      '& button': {
        '& img': {
          marginTop: -10,
        }

      }
    },
    '& button': {
      border: 'none'
    }
  }
};
