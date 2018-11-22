import palette from '../../../styles/palette';

const primary = palette.primary;
const grey = palette.grey;
const green = palette.green;
const red = palette.red;
const boxShadow = palette.boxShadow;

export default {
  root: {
    '& .statsHeading': {
      alignItems: 'center',
      display: 'flex',
      fontSize: '32px'
    },
    '& .headingIcon': {
      height: '50px',
      width: '60px'
    },
    '& .statsMainDiv': {
      display: 'flex',
      justifyContent: 'space-around',
      overflow: 'hidden',
      width: '100%'
    },
    '& .statsCard': {
      boxShadow: boxShadow,
      padding: '0px !important',
      margin: '20px',
      textAlign: 'center',
      borderRadius: '10px',
      height: '255px !important'

    },
    '& .statsCardHeader': {
      background: primary,
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px'
    },
    '& .statsGridDiv': {
      width: '100%',
      justifyContent: 'space-between',
      padding: '0 2%'
    },
    '& .statsTextHeading': {
      lineHeight: '2em',
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginTop: '20px',
      height: '60px',
      '& h1': {
        color: primary
      }
    },
    '& .statsText': {
      color: 'rgb(189, 195, 199)',
      padding: '10px 0',
      fontSize: '1.4em',
      height: '50px',
    },
    '& .statsPercentage': {
      //border: '1px solid red',
      color: 'rgb(52, 152, 219)',
      position: 'absolute',
      right: '0px',
      left: '0px',
      bottom: '0px',
      height: '25px',
      margin: '0 0 6% 1%',
      '& >img': {
        //border: '1px solid blue',
        margin: '0 3% 0 0'
      }
    },
    '& .loading': {
      marginTop: '30px',
      '&>div>svg>circle': {
        stroke: `${primary } !Important`
      }
    },
    '& .changeTxtHeading': {
      fontWeight: 'bold',
      marginTop: '20px',
      height: '60px',
      '& .changeTxtBody': {
        color: grey,
      },
      '& .firstLine': {
        lineHeight: '2rem',
        fontSize: '1.5rem',
        color: primary
      },
      '& .symbol': {
        fontSize: '1rem',
        color: primary
      },
      '& .percentage': {
        fontSize: '1.3rem'
      },
      '& .goingUp':{ color: green},
      '& .goingDown':{color: red},
    },
  },
  mRoot: {
    extend: 'root',
    marginBottom: '15% !important',
    '& .statsCard': {
      margin: '20px 10%',
      width: '80% !important'
    }
  }
};
