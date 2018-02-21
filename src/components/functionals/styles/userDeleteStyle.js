import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const greyLight = palette.greyLight;

export default {
  root: {
    paddingTop: '20px',
    '& button span': {
      color: 'white',
      textTransform: 'capitalize',
    },
    '& .userDelete-heading': {
      marginLeft: '20px',
      fontWeight: 'normal',
      fontSize: '21px',
      borderBottom: '0.1px solid ' + greyLight,
    },
    '& .UserDelete-text': {
      marginLeft: '35px',
      fontWeight: 'normal',
    },
    '& .delete-button-grid': {
      padding: '20px 0px',
      marginLeft: 40,
      '& .delete-button': {
        borderRadius: '5px',
        padding: '8px',
        minHeight: '25px',
        width: '150px',
        fontSize: '16px',
      },
    },
    '& .input-field': {
      color: primary,
      width: 200,
      border: 'thin solid' + greyLight,
      display: 'inline-block',
      padding: 5,
      marginTop: 10,
      marginLeft: 35,
      verticalAlign: 'top',
    },
    '& button': {
      backgroundColor: primary,
      '&:hover': {
        backgroundColor: primaryLight,
      },
    },
  },
  mRoot: {
    extend: 'root',
    '& .userDelete-heading': {
      marginLeft: 5
    },
    '& .UserDelete-text': {
      marginLeft: 5
    },
    '& .delete-button-grid': {
      margin: 'auto',
      marginLeft: 0,
      textAlign: 'center',
      width: '100%',
    }
  },
};
