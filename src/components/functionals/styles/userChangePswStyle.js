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
    '& .MuiButton-label-17': {
      color: 'white',
      textTransform: 'capitalize',
    },
    '& .changePsw-text': {
      marginLeft: '20px',
      fontWeight: 'lighter',
      fontSize: '21px',
    },
    '& .changePsw-credential-grid': {
      marginTop: '-20px',
      '& .changedPsw-note': {
        color: primaryLight,
        margin: '20px 40px',
        display: 'block',
      },
      '& .form-group': {
        flexDirection: 'row',
        marginTop: '10px',
        display: 'block',
        '& .label': {
          width: '20%',
          display: 'inline-block',
          textAlign: 'right',
          fontSize: '15px',
          marginTop: '15px',
          color: primary,
          paddingRight: '10px',
        },
        '& .input-field': {
          color: primaryLight,
          width: 'calc(40% - 100px)',
          margin: '0px 10px',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '10px',
          '&::before': {
            backgroundColor: 'transparent',
          },
        },
        '& .validation-message': {
          width: '25%',
          marginLeft: '21px',
          display: 'inline-block',
          fontSize: '15px',
          marginTop: '15px',
          color: greyDark,
          '& img': {
            width: '20px',
            marginRight: '5px',
          },
          '& .strong': {
            color: secondary,
            fontWeight: 'bold',
            marginLeft: 5,
          },
        },
      },
    },
    '& .update-button-grid': {
      padding: '20px',
      '& .update-button': {
        borderRadius: '5px',
        background: primary,
        color: `${white} !important`,
      },
    },
  },
};
