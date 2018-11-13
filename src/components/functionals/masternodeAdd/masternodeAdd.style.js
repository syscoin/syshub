import palette from '../../../styles/palette';

const white = palette.white;
const primary = palette.primary;
const primaryLight = palette.primaryLight;
const greyLight = palette.greyLight;

export default {
  root: {
    '& .add-title': {
      display: 'inline-block',
      fontWeight: 'normal'
    },
    '& .heading': {
      borderBottom: '1px solid ' + greyLight
    },
    '& .form__container': {
      padding: '20px',
      '& .form-group': {
        flexDirection: 'row',
        marginTop: '10px'
      },
      '& .label': {
        width: '40%',
        display: 'inline-block',
        fontSize: '18px',
        marginTop: '20px',
        color: primary,
        paddingLeft: '50px',
        textAlign: 'left',
        fontWeight: 'normal'
      },
      '& .input-field': {
        width: 'calc(45% - 80px)',
        margin: '0px 65px',
        display: 'inline-block',
        border: 'thin solid ' + greyLight,
        padding: '10px 25px',
        marginTop: '10px',
        '&::before': {
          backgroundColor: 'transparent'
        }
      },
      '& .form-button-group': {
        display: 'inherit',
        marginTop: 25,
        marginLeft: 34,
        '&>button': {
          backgroundColor: primary,
          margin: '0 10px',
          borderRadius: 6,
          fontSize: 17,
          textTransform: 'capitalize',
          '&:hover': {
            backgroundColor: primaryLight
          },
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
    '& .add-title': {
      marginBottom: 0
    },
    '& .form__container': {
      padding: 0,
      '& .form-group': {
        '& .label': {
          padding: '0 !important',
          width: '100%'
        },
        '& .input-field': {
          width: '100%',
          margin: 0,
          padding: 10
        }
      },
      '& .form-button-group': {
        marginLeft: 0,
        textAlign: 'center'
      }
    }
  }
};
