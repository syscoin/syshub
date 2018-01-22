import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

export default {
  root: {
    padding: '10px 0px 0px 20px',
    height: '50vh',
    '& .form__container': {
      backgroundColor: white,
      padding: '20px',
      boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 30px',
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
        margin: '10px 10px 0px ,10px',
        display: 'inline-block',
        border: 'thin solid ' + greyLight,
        padding: '10px',
        '&::before':{
          backgroundColor: 'transparent'
        }
      },
      '& .recaptcha': {
        marginLeft: 10
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
      }
      ,
      '& .terms-of-condition  ':{
        textAlign: 'center',
        display: 'grid'
      },
      '& .form-button-group':{
        textAlign: 'center',
        display: 'inherit',
        '&>button':{
          backgroundColor: primary,
          margin: '0 10px',
          borderRadius: 10,
          '& span': {
            color: white,
            fontWeight: 'bold'
          }
        }
      }
    },
    '& .title':{
      display: "inline-block",
      fontWeight: 'lighter'
    }

  },

};
