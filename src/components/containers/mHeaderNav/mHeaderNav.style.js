import palette from '../../../styles/palette';



const grey = palette.grey;
const white = palette.white;

export default {
  mRoot: {
    borderTop: 'thin solid ' + grey,
    marginBottom: 0,
    marginTop: 0,
    '& .left-section': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 0,
      height: 55,
      borderRight: `thin solid ${grey}`,
      '& .menu-icon': {
        fill: white,
      }
    },
    '& .divider': {
      height: '100%',
      margin: 0
    },
    '& .center-section': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 55,
      '& img': {
        maxWidth: '100%'
      }
    },
    '& .right-section': {
      padding: 0,
      textAlign: 'center',
      height: 54,
      borderLeft: 'thin solid ' + grey,
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
