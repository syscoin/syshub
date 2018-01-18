import palette from './palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;


export default {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    "& .common" : {
      color: white,
      padding: 0,
      '& .icon':{
        height: 20
      },
      "& .TxtRegular":{
        padding: '0 15px',
        color: white,
        padding: '0',
        fontSize: '1.2em',
      },
      "& .TxtBold": {
        padding: '0 15px',
        color: white,
        padding: '0 0 0 10px',
        fontSize: '1.3em',
        fontWeight: 'bold',
      },
      "& .button": {
        border: 'none',
        padding: '0 15px',
      },
      '& .login-btn , .logout-btn':{
        padding: 0,
        '& div': {
          color: '#fff'
        }
      }

    },
  }
 };
