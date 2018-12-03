import palette from '../../../styles/palette';

const primaryLight = palette.primaryLight;
const greyLight = palette.greyLight;
export default {
  root: {
    paddingTop: '20px',
    '& .heading-2FA': {
      marginLeft: '20px',
      fontWeight: 'normal',
      fontSize: '21px',
      borderBottom: '0.1px solid ' + greyLight
    },
    '& .heading2FA-note': {
      color: primaryLight,
      margin: '20px 0px 10px 40px',
      display: 'block',
      fontWeight: 'normal'
    },
    '& .content2FA':{
      margin: '0 20px'
    },
    '& .content2FA-left':{
      border: '1px solid orange'
    },
    '& .content2FA-right':{
      border: '1px solid orange'
    },
  },
  mRoot: {
    extend: 'root',
    '& .heading-grid': {
      width: '100%',
    },
    '& .userTwoFactor-heading': {
      marginLeft: 5
    },
    '& .enable2FA-note': {
      margin: '15px 0px 20px 10px'
    }
  }
};
