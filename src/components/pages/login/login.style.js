import palette from '../../../styles/palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;


export default {
  root: {
    padding: '10px 0px 0px 0px',
    height: '50vh',
    '& .form__container': {
      backgroundColor: white,
      padding: '20px',
      boxShadow: '-1px 18px 38px -18px rgba(0,0,0,0.25)',
      '& .form-group': {
        flexDirection: 'row',
        marginTop: '10px'
      },
      '& .signUpTxt': {
        fontSize: '120%',
        color: primary
      },
      '& .label': {
        width: '25%',
        display: 'inline-block',
        textAlign: 'right',
        fontSize: '15px',
        marginTop: '15px',
        color: primary,
        paddingRight: '10px'
      },
      '& .input-field': {
        width: 300,
        margin: '0px 10px',
        display: 'inline-block',
        border: 'thin solid ' + greyLight,
        padding: '10px',
        marginTop: '10px',
        '&::before': {
          backgroundColor: 'transparent'
        }
      },
      '& .recaptcha': {
        marginLeft: '1.5%',
        width: 300
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
        display: 'grid'
      },
      '& .form-button-group': {
        textAlign: 'center',
        display: 'inherit',
        marginTop: 30,
        width: 'calc(25% + 300px)',
        marginLeft: 'calc(12% + 27px)',
        '&>button': {
          backgroundColor: primary,
          margin: '0 10px 10px 10px',
          borderRadius: 10,
          '& span': {
            color: white,
            fontWeight: 'bold'
          }
        }
      }
    },
    '& .title': {
      color: greyDark,
      textTransform: 'uppercase',
      padding: 15,
      fontWeight: 300,
      margin: 'auto',
    }
  },
  mRoot: {
    extend: 'root',
    height: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    '& .form-group .label': {
      textAlign: 'left !important'
    },
    '& .input-field': {
      width: '100% !important',
      marginLeft: '0px !important'
    },
    '& .recaptcha': {
      width: '100% !important',

      '& div': {
        marginTop: 5,
        display: 'inline-block'
      }
    },
    '& .form-button-group': {
      width: '100% !important',
      marginLeft: '0px !important'
    }
  }
};