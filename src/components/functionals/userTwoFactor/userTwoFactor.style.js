import palette from '../../../styles/palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const red = palette.red;
const green = palette.green;
const white = palette.white;
export default {
  root: {
    paddingTop: '20px',

    '& button span': {
      color: 'white',
      textTransform: 'capitalize'
    },
    '& .userTwoFactor-heading': {
      marginLeft: '20px',
      fontWeight: 'normal',
      fontSize: '21px',
      borderBottom: '0.1px solid ' + greyLight
    },
    '& .heading-2FA': {
      color: primaryLight
    },
    '& .userTwoFactor-left-grid': {
      marginTop: '-20px',
      marginLeft: 20,
      '& .enable2FA-note': {
        color: primaryLight,
        margin: '20px 0px 10px 0px',
        display: 'block',
        fontWeight: 'normal'
      },
      '& .div-margin': {
        margin: '12px 0 12px 0px',
        '& .statusText-span': {
          display: 'inline-block',
          textAlign: 'right',
          fontSize: '15px',
          margin: '15px 0 0px 0',
          color: primary,
          paddingRight: '10px'
        },
        '& .status-enable': {
          margin: '0 1%',
          color: green,
          fontWeight: 'bold',
          fontSize: '1.3em',
          '& .lowSecurity-span': {
            color: greyDark,
            margin: '0 1%'
          }
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
            margin: '0 1%'
          }
        },
        '& .reCapthaWraper': {
          margin: '15px 0'
        }
      },
      '& label': {
        fontSize: '15px',
        marginTop: '15px',
        color: primary,
        paddingRight: '0px',
      },
      '& .phoneWrapper': {
        '& .form-group': {
          flexDirection: 'row',
          marginTop: '10px',
          display: 'block',
        },
        '& .secret-Input-field': {
          color: primaryLight,
          width: 'calc(50% - 20px)',
          marginLeft: '60px',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '5px',
          '&::before': {
            backgroundColor: 'transparent'
          }
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
            backgroundColor: 'transparent'
          }
        }
      },
      '& .generate-button': {
        padding: '0px 10px',
        minHeight: '25px',
        borderRadius: '5px'
      },
      '& .qr-div': {
        marginLeft: '150px',
        marginTop: '-10px'
      }
    },
    '& .userTwoFactor-right-grid': {
      marginTop: '50px',
      '& ol': {
        fontWeight: '100'
      },
      '& .enableInstruction-heading': {
        fontSize: '20px',
        color: primary,
        fontWeight: 'bold',
        padding: '0px 30px'
      },
      '& .googleAuthApp-text': {
        color: primary,
        fontWeight: 'bold'
      },
      '& li': {
        padding: '10px 0px 10px 10px',
        color: greyDark
      },
      '& img': {
        width: '120px',
        padding: '10px'
      }
    },
    '& .twoFactor-button-grid': {
      padding: '20px 0px',
      '& .twoFactor-button': {
        borderRadius: 5,
        padding: 8,
        minHeight: 40,
        width: 150,
        fontSize: 16,
        marginLeft: 10
      }
    },
    '& .form__container': {
      marginLeft: 10,
      '& .form-group': {
        display: 'block',
        flexDirection: 'row',
        '& .label': {
          width: '25%',
          display: 'inline-block',
          textAlign: 'right',
          fontSize: '15px',
          marginTop: '15px',
          color: primary,
          paddingRight: '10px',
          fontWeight: 'normal'
        },
        '& .input-field': {
          color: primaryLight,
          width: 'calc(40% - 100px)',
          margin: '0px 10px',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '10px',
          '&::before': {
            backgroundColor: 'transparent'
          }
        }
      },
      '& .form-grid-btn': {
        padding: '20px 0px'
      },
      '& button': {
        borderRadius: 5,
        padding: 8,
        minHeight: 25,
        width: 150,
        fontSize: 16,
        height: 40,
        color: white,
        backgroundColor: primary,
        '&:hover': {
          backgroundColor: primaryLight
        }
      }
    },
    '& .reCapthaWraper':{
      marginLeft: 10
    },
    '& button': {
      backgroundColor: primary,
      '&:hover': {
        backgroundColor: primaryLight
      }
    }
  },
  mRoot: {
    extend: 'root',
    '& .heading-grid': {
      width: '100%',
      '& .userTwoFactor-heading': {
        marginLeft: 5
      }
    },
    '& .userTwoFactor-left-grid': {
      textAlign: 'center',
      marginLeft: 0,
      '& .twoFactor-button-grid': {
        textAlign: 'center'
      },
      '& .enable2FA-note': {
        margin: '15px 0px 20px 10px'
      },
      '& .reCapthaWraper': {
        margin: 0,
        textAlign: 'center',
        '& div':{
          display: 'inline-block'
        }
      }
    },
    '& .form__container': {
      marginLeft: 0,
      width: '100%',
      '& .ant-form': {
        '& .ant-form-item': {
          '& .label': {
            width: '100%',
            display: 'block',
            fontSize: 17,
            textAlign: 'left',
            paddingLeft: 15
          },
          '& .input-field': {
            width: '100%'
          }
        }
      }
    },
    '& .form-grid-btn': {
      textAlign: 'center'
    }
  }
};
