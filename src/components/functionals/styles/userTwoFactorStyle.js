import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const red = palette.red;
const green = palette.green;
const secondary = palette.secondary;

export default {
  root: {
    paddingTop: '20px',
    '& button span': {
      color: 'white',
      textTransform: 'capitalize',
    },
    '& .userTwoFactor-heading': {
      marginLeft: '20px',
      fontWeight: '100',
      fontSize: '21px',
      borderBottom: '0.1px solid ' + greyLight,
    },
    '& .heading-2FA': {
      color: primaryLight,
    },
    '& .userTwoFactor-left-grid': {
      marginTop: '-20px',
      '& .enable2FA-note': {
        color: primaryLight,
        margin: '20px 0px 10px 40px',
        display: 'block',
        fontWeight: '100',
      },
      '& .div-margin': {
        margin: '12px 0 12px 40px',
        '& .statusText-span': {
          display: 'inline-block',
          textAlign: 'right',
          fontSize: '15px',
          margin: '15px 0 0px 0',
          color: primary,
          paddingRight: '10px',
        },
        '& .status-enable': {
          margin: '0 1%',
          color: green,
          fontWeight: 'bold',
          fontSize: '1.3em',
          '& .lowSecurity-span': {
            color: greyDark,
            margin: '0 1%',
          },
        },
        '& .status-disable': {
          margin: '0 1%',
          color: red,
          fontWeight: 'bold',
          fontSize: '1.3em',
          '& .lowSecurity-span': {
            color: greyDark,
            fontWeight: 'normal',
            fontSize: '0.8em',
            margin: '0 1%',
          },
        },
        '& .reCapthaWraper': {
          margin: '15px 0',
        },
      },
      '& .form-group': {
        flexDirection: 'row',
        marginTop: '10px',
        display: 'block',
        '& .label': {
          display: 'inline-block',
          textAlign: 'right',
          fontSize: '15px',
          marginTop: '15px',
          color: primary,
          paddingRight: '10px',
          '& .fromApp-span': {
            display: 'block',
            textAlign: 'center',
          },
        },
        '& .secret-Input-field': {
          color: primaryLight,
          width: 'calc(50% - 20px)',
          marginLeft: '60px',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '5px',
          '&::before': {
            backgroundColor: 'transparent',
          },
        },
        '& .code-Input-field': {
          color: primaryLight,
          width: 'calc(50% - 20px)',
          marginLeft: '10px',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '5px',
          verticalAlign: 'top',
          marginTop: 20,
          '&::before': {
            backgroundColor: 'transparent',
          },
        },
      },
      '& .generate-button': {
        padding: '0px 10px',
        minHeight: '25px',
        borderRadius: '5px',
      },
      '& .qr-div': {
        marginLeft: '150px',
        marginTop: '-10px',
      },
    },
    '& .userTwoFactor-right-grid': {
      marginTop: '50px',
      '& ol': {
        fontWeight: '100',
      },
      '& .enableInstruction-heading': {
        fontSize: '20px',
        color: primary,
        fontWeight: 'bold',
        padding: '0px 30px',
      },
      '& .googleAuthApp-text': {
        color: primary,
        fontWeight: 'bold',
      },
      '& li': {
        padding: '10px 0px 10px 10px',
        color: greyDark,
      },
      '& img': {
        width: '120px',
        padding: '10px',
      },
    },
    '& .twoFactor-button-grid': {
      padding: '20px',
      '& .twoFactor-button': {
        borderRadius: '5px',
        padding: '8px',
        minHeight: '25px',
        width: '150px',
        fontSize: '16px',
      },
    },
    '& button': {
      backgroundColor: primary,
      '&:hover': {
        backgroundColor: primaryLight,
      },
    },
  },
};
