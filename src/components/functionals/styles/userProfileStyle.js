import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;

export default {
  root: {
    '& button span': {
      color: 'white',
      textTransform: 'capitalize',
      padding: '3px 0px'
    },
    '& .profile-heading': {
      margin: '10px 20px 20px 20px',
      fontWeight: 'normal',
      fontSize: '21px',
      borderBottom: '0.1px solid ' + greyLight
    },
    '& .profile-image-grid': {
      maxWidth:205,
      marginLeft: 20,
      textAlign: 'center',
      '& .avatar-container': {
        maxWidth: 150,
        padding: 10,
        border: 'thin solid ' + greyLight
      },
      '& .user-image': {
        width: '100%'
      },
      '& .change-photo-btn': {
        fontSize: '12px',
        width:'100%',
        '& .link-color': {
          color: primary,
          fontWeight: 'normal',
          cursor: 'pointer'
        }
      },
      '& .upload-image-container': {
        overflow: 'hidden',
        position: 'relative',
        display: 'inline-block',
        '& input[type=file]': {
          cursor: 'pointer',
          display: 'block',
          fontSize: 999,
          filter: 'alpha(opacity=0)',
          minHeight: '100%',
          minWidth: '100%',
          opacity: 0,
          position: 'absolute',
          right: 0,
          textAlign: 'right',
          top: 0,
          height: '100%'
        }
      }
    },
    '& .profile-credential-grid': {
      marginTop: -10,
      '& .form-group': {
        flexDirection: 'row',
        marginTop: '10px',
        display: 'block',
        '& .label': {
          width: 75,
          display: 'inline-block',
          textAlign: 'left',
          fontSize: 15,
          fontWeight: 'normal',
          color: primary
        },
        '& .input-field': {
          width: 'calc(45% - 20px)',
          margin: '0px 10px',
          display: 'inline-block',
          border: 'thin solid ' + greyLight,
          padding: '10px',
          '&::before': {
            backgroundColor: 'transparent'
          }
        },
        '& .validation-message': {
          display: 'inline-block',
          fontSize: 15,
          color: greyDark,
          fontWeight: '100'
        }
      }
    },
    '& .update-button-grid': {
      padding: 20,
      marginLeft: 20
    },
    '& button': {
      borderRadius: '5px',
      padding: '5px',
      minHeight: '25px',
      width: '150px',
      fontSize: '16px',
      backgroundColor: primary,
      '&:hover': {
        backgroundColor: primaryLight
      }
    }
  },
  mRoot: {
    extend: 'root',
    '& .profile-grid': {
      display: 'inherit'
    },
    '& .profile-heading': {
      margin: '0px 20px 20px 15px'
    },
    '& .profile-image-grid': {
      paddingTop: 10,
      paddingBottom: 30,
      textAlign: 'center',
      '& .upload-image-container': {
        width: '100%',
        margin: 'auto',
      }
    },
    '& .profile-credential-grid': {
      '& .form-group': {
        '& .label': {
          fontSize: 17,
          marginLeft: 25
        },
        '& .input-field': {
          display: 'block',
          width: '90%',
          margin: 'auto'
        },
        '& .validation-message': {
          marginLeft: 25,
          paddingTop: 5,
          fontSize: 16
        }
      }
    },
    '& .update-button-grid': {
      textAlign: 'center'
    }
  }
};
