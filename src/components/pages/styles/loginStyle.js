import palette from './palette';

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
      '& .form__wrapper>div': {
        maxWidth: 475
      },
      '& .form-group': {
        flexDirection: 'row',
        marginTop: '10px'
      },
      '& .label': {
        width: '20%',
        display: 'inline-block',
        textAlign: 'right',
        fontSize: '15px',
        marginTop: '15px',
        color: primary,
        paddingRight: '10px'
      },
      '& .input-field': {
        width: 'calc(45% - 20px)',
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
    height: 'calc(100vh - 220px)',
    overflowY: 'scroll',
    overflowX: 'hidden',
    // marginTop: '36px',
    '& .form-group .label':{
      textAlign: 'left !important'
    },
    '& .input-field': {
      width: '100% !important',
      marginLeft: '0px !important'
    },
    '& .recaptcha': {
      marginLeft: 0,
      textAlign: 'center',
      '&>div':{
        display: 'inline-block',
        transform: 'scale(0.90) !important',
        '-webkitTransform': 'scale(0.90) !important',
        transformOrigin:'0 0 !important',
        '-webkitTransformOrigin':'0 0 !important',
      },
      '@media (max-width: 400px)':{
        '& iframe':{
          marginLeft: '-15px !important',
        },
        width: '100%'
      }
    }
  }
};
