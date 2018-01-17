import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;

export default {
  root: {
    paddingTop: '20px',
    '& .MuiButton-label-17': {
      color: 'white',
      textTransform: 'capitalize',
    },
    '& .userTwoFactor-heading': {
      marginLeft: '20px',
      fontWeight: 'lighter',
      fontSize: '21px',
    },
    '& .heading-2FA': {
      color: primaryLight,
    },
    '& .userTwoFactor-left-grid': {
      marginTop: '-20px',
      '& .enable2FA-note': {
        color: primaryLight,
        margin: '20px 40px',
        display: 'block',
      },
      '& .div-margin': {
        marginLeft: '40px',
        marginTop: '12px',
        '& .statusText-span': {
          display: 'inline-block',
          textAlign: 'right',
          fontSize: '15px',
          marginTop: '15px',
          color: primary,
          paddingRight: '10px',
        },
        '& .status-span': {
          marginLeft: '22%',
          color: '#D61414',
          '& .lowSecurity-span': {
            color: greyDark,
          },
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
          marginLeft: '30px',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '5px',
          '&::before': {
            backgroundColor: 'transparent',
          },
        },
      },
      '& .generate-button': {
        padding: '0px 10px',
        minHeight: '25px',
        borderRadius: '5px',
        background: primary,
      },
      '& .qr-div': {
        marginLeft: '150px',
        marginTop: '-50px',
      },
    },
    '& .userTwoFactor-right-grid': {
      marginTop: '50px',
      '& .enableInstruction-heading': {
        fontSize: '20px',
        color: primary,
        fontWeight: 'bold',
        padding: '0px 30px',
      },
      '& .gogleAuthApp-text': {
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
        background: primary,
      },
    },
  },
};
