import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

export default {
  root: {
    padding: '10px 0px 30px 0px',
    height: '50vh',
    '& .title': {
      color: greyDark,
      textTransform: 'uppercase',
      padding: 15,
      fontWeight: 300,
      margin: 'auto'
    },
    '& .form__container': {
      backgroundColor: white,
      padding: '20px',
      boxShadow: '-1px 18px 38px -18px rgba(0,0,0,0.25)',
      '& .form-group': {
        flexDirection: 'row',
        marginTop: '10px',
        '& .ant-form-explain': {
          marginLeft: 'calc(25% + 10px)',
          marginTop: 5
        }
      },
      '& .label': {
        width: '25%',
        display: 'inline-block',
        textAlign: 'right',
        fontSize: '15px',
        color: primary,
        paddingRight: '10px'
      },
      '& .input-field': {
        width: 300,
        margin: '10px 10px 0px 10px',
        display: 'inline-block',
        border: 'thin solid ' + greyLight,
        padding: '6px',
        '&::before': {
          backgroundColor: 'transparent'
        }
      },
      '& .input-password-feild': {
        width: 300,
        margin: '10px 10px 0px 10px',
        display: 'inline-block',
        border: 'thin solid ' + greyLight,
        padding: '9px 10px',
        '& .ReactPasswordStrength-input': {
          padding: 0
        },
        '& .ReactPasswordStrength-strength-desc': {
          marginRight: -100,
          textTransform: 'capitalize',
          padding: '7px 12px',
          width: '40%',
          fontStyle: 'normal'
        },
        '&::before': {
          backgroundColor: 'transparent'
        }
      },
      '& .recaptcha': {
        // marginLeft: 10,
        marginRight:6,
        width: '73%',
        display: 'inline-block',
        float: 'right'
      },
      '& .validation-message': {
        width: '35%',
        display: 'inline-block',
        fontSize: '15px',
        marginTop: '15px',
        color: greyDark,
        '& img': {
          width: '20px',
          marginRight: '5px'
        },
        '& .strong': {
          color: secondary,
          fontWeight: 'bold',
          marginLeft: 5
        }
      },
      '& .terms-of-condition  ': {
        textAlign: 'center',
        display: 'grid',
        marginRight:88
      },
      '& .form-button-group': {
        textAlign: 'center',
        display: 'inherit',
        '&>.ant-form-item-control-wrapper>.ant-form-item-control>button': {
          backgroundColor: primary,
          marginRight:40,
          borderRadius: 10,
          minHeight:40,
          '& span': {
            color: white,
            fontWeight: 'bold'
          }
        }
      }
    }
  },
  mRoot: {
    extend: 'root',
    marginTop: 0,
    paddingLeft: 0,
    height: '100%',
    '& .input-field': {
      width: '100% !important',
      margin: '0px !important'
    },
    '& .label': {
      marginTop: '10px !important'
    },
    '& .form__container': {
      marginBottom: '100px',
      '& .label': {
        width: '50%',
        marginBottom: 10,
        textAlign: 'left'
      },
      '& .recaptcha': {
        marginLeft: 0,
        textAlign: 'center',
        '& div': {
          display: 'inline-block'
        }
      },
      '& .form-group': {
        margin: 0,
        '& .ant-form-explain': {
          marginLeft: 0
        }
      },
      '& .validation-message': {
        width: '100% !important',
        margin: '0px !important'
      },
      '& .recaptcha, .input-password-feild': {
        width: '100% !important',
        margin: 0,
        '& .ReactPasswordStrength-strength-desc': {
          display: 'inline-block',
          width: '100%',
          marginTop: 30,
          left: 0,
          textAlign: 'left'
        }
      },
      '& .terms-of-condition':{
        margin: 0
      }
    }
  }
};
