import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const grey = palette.textLignt;

export default {
  root: {
    '& .statsHeading': {
      alignItems: 'center',
      display: 'flex',
      fontSiza: '32px',
    },
    '& .headingIcon': {
      height: '50px',
      width: '60px',
    },
    '& .statsMainDiv': {
      display: 'flex',
      justifyContent: 'space-around',
      overflow: 'hidden',
      width: '100%',
    },
    '& .statsCard': {
      boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 20px',
      padding: '0px !important',
      margin: '25px',
      textAlign: 'center',
      borderRadius: '10px',
    },
    '& .statsCardHeader': {
      background: primary,
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
    },
    '& .statsGridDiv': {
      width: '100%',
      justifyContent: 'space-between',
    },
    '& .statsTextHeading': {
      lineHeight: '2em',
      fontSize: '1.2em',
      fontWeight: 'bold',
      marginTop: '20px',
      height: '60px',
      '& h1': {
        color: primary,
      },
    },
    '& .statsText': {
      color: 'rgb(189, 195, 199)',
      padding: '10px 10px',
      fontSize: '1.4em',
      height: '100px',
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
        margin: '0 3% 0 0',
      },
    },
  },
};
