import palette from '../../../styles/palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const red = palette.red;
const green = palette.green;
const white = palette.white;
export default {
  modalRoot:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    background: white,
    boxShadow: green,
    padding: 0,
    color:greyDark,
    '& .modalHeaderWrapper': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '0 0 0 40px',
      backgroundColor: primary,
      '& *': {
        color: white
      }
    },
    '& .closeBtn': {
      alignSelf: 'flex-end',
    },
    '& .modalBodyWrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '40px'
    },
    '& .qrCode':{
      width: '300px',
      height: '300px'
    },
    '& .instructions': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    '& .storeBtnWrapper': {
      margin: '10px 0 20px 0'
    },
    '& .gButton': {
      margin: '0 10px'
    },
    '& .aButton': {
      margin: '0 10px'
    },
    '& .inputWrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      '& .codeInput': {
        maxWidth:  '30%',
      },
      '& .verifyCode': {
        margin: '25px 0px 0 20px',
        width: '30%'
      }
    },
    '& .rightIcon': {
      margin: '0 0 0 5px',
    },
  },
  mModalRoot: {
    extend: 'modalRoot',
  },
  root: {
    paddingTop: '20px',
    '& .hide': {
      display: 'none'
    },
    '& .show': {
      display: 1
    },
    '& button span': {
      color: 'white',
      textTransform: 'capitalize'
    },
    '& .userTwoFactor-heading': {
      marginLeft: '20px',
      fontWeight: 'normal',
      fontSize: '21px',
      borderBottom: `0.1px solid ${greyLight}`
    },
    '& .heading-2FA': {
      color: primaryLight
    },
    '& .userTwoFactor': {
      marginTop: '-20px',
      marginLeft: 20,
      '& .enable2FA-note': {
        color: primaryLight,
        margin: '20px 0px 10px 0px',
        display: 'block',
        fontWeight: 'normal'
      },
      '& .statusWrapper': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        margin: '12px 0',
        minHeight: '54px',
        '& .statusTextSpan': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0 10px 0 0',
          padding: '0 10px 0 0',
          borderRight: `2px solid ${greyLight}`,
          textAlign: 'left',
          fontSize: '15px',
          color: primary,
        },
        '& .statusEnable': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0 1%',
          color: green,
          fontWeight: 'bold',
          fontSize: '1.3em',
          '& .lowSecuritySpan': {
            color: greyDark,
            margin: '0 1%'
          }
        },
        '& .statusDisable': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: '0 1%',
          color: red,
          fontWeight: 'bold',
          fontSize: '1.3em',
          '& .lowSecuritySpan': {
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
    '& .twoFactorBtnGrid': {
      padding: '20px 0px',
      '& .twoFactorBtn': {
        borderRadius: 5,
        padding: 8,
        minHeight: 40,
        width: 150,
        fontSize: 16,
        marginLeft: 10,
        
      }
    },
    '& .active': {
      background: primary,
      '&:hover': {
        background: primaryLight
      },
    },
    '& .disabled': {
      background: greyLight,
      cursor: 'not-allowed',
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
      '& .twoFactorBtnGrid': {
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
