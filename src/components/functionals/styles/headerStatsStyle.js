import palette from './palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;


export default {
  root:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
     "& .common" : {
      padding: '0 30px',
      color: white
    },

     "& .TxtBold" : {
      padding: '0 30px',
      color: white,
      padding: '0 0 0 10px',
      fontWeight: 'bold'
    },

    "& .divider " : {
      height: '75%',
      borderLeft: `1px solid ${primaryDark}`,
      borderRight: `1px solid ${primaryLight}`
    }

  }
 };
