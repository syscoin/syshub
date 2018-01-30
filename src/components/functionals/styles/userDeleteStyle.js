import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

export default {
  root: {
    paddingTop: '20px',
    '& button span': {
      color: 'white',
      textTransform: 'capitalize',
    },
    '& .userDelete-heading': {
      marginLeft: '20px',
      fontWeight: '100',
      fontSize: '21px',
      borderBottom: '0.1px solid ' + greyLight,
    },
    '& .UserDelete-text': {
      marginLeft: '35px',
      fontWeight: '100',
    },
    '& .delete-button-grid': {
      padding: '20px',
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
  mRoot: { extend: 'root' },
};
