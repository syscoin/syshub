import palette from './palette';



const grey = palette.grey;

export default {
  mRoot: {
    borderTop: 'thin solid ' + grey,
    marginBottom: 0,
    marginTop: 0,
    '& .left-section': {
      textAlign: 'center',
      padding: 0,
      height: 55,
      borderRight: 'thin solid ' + grey,
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
      height: 55,
      '& img': {
        height: 40,
        width: 70,
        marginTop: -29
      }
    },
    '& .right-section': {
      padding: 0,
      textAlign: 'center',
      height: 55,
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
