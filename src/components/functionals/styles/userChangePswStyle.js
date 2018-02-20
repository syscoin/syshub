import palette from './palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

export default {
  root: {
    paddingTop: '20px',
    '& button span': {
      color: 'white',
      textTransform: 'capitalize',
    },
    '& .changePsw-heading': {
      marginLeft: '20px',
      fontWeight: 'normal',
      fontSize: '21px',
      borderBottom: '0.1px solid ' + greyLight,
    },
    '& .changePsw-credential-grid': {
      width: '100%',
      marginTop: '-20px',
      '& .changedPsw-note': {
        color: primaryLight,
        margin: '20px 40px',
        display: 'block',
        fontWeight: 'normal',
      },

      '& .formGroup-div': {
        marginLeft: '20px',
        '& .form-group': {
          flexDirection: 'row',
          marginTop: '10px',
          display: 'block',
          '& .label': {
            width: '21%',
            display: 'inline-block',
            textAlign: 'right',
            fontSize: '15px',
            marginTop: '15px',
            color: primary,
            paddingRight: '10px',
            fontWeight: 'normal',
          },
          '& .input-field': {
            color: primaryLight,
            width: 'calc(40% - 100px)',
            margin: '0px 10px',
            display: 'inline-block',
            border: 'thin solid ' + greyLight,
            padding: '10px',
            '&::before': {
              backgroundColor: 'transparent',
            },
          },
          '& .validation-message': {
            marginLeft: '21px',
            display: 'inline-block',
            fontSize: '15px',
            marginTop: '15px',
            color: greyDark,
            fontWeight: '100',
            '& img': {
              width: '20px',
              marginRight: '5px',
            },
            '& .strong': {
              color: secondary,
              fontWeight: 'bold',
              marginLeft: 5,
            },
          },
        },
      },
      '& .input-password-feild': {
        color: primaryLight,
        width: 'calc(40% - 100px)',
        margin: '0px 10px',
        display: 'inline-block',
        border: 'thin solid ' + greyLight,
        '& .ReactPasswordStrength-input': {
          width: '100%',
          padding: '9px',
          fontSize: '12px',
        },
        '& .ReactPasswordStrength-strength-desc': {
          width: '100%',
          marginRight: '-270px',
          textTransform: 'capitalize',
          padding: '5px',
          fontStyle: 'normal',
        },
      },
      '& .ant-form-explain': {
        marginLeft: '220px',
        padding: '5px',
      },
    },
    '& .confirmChange-button-grid': {
      padding: '20px 0px',
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
        backgroundColor: primaryLight,
      },
    },
  },
  mRoot: {
    extend: 'root',
    '& .userPwd-grid': {
      width: '100%',
      '& .changePsw-heading': {
        marginLeft: 3,
      },
      '& .changePsw-credential-grid': {
        '& .changedPsw-note': {
          margin: '15px 8px',
          fontSize: 13,
        },
        '& .formGroup-div': {
          margin: 0,
          '& .ant-form': {
            '& .ant-form-item': {
              '& .label': {
                width: '100%',
                display: 'block',
                fontSize: 17,
                textAlign: 'left',
                paddingLeft: 15,

              },
              '& .input-field': {
                width: '100%',
              },
              '& .input-password-feild': {
                width: '100%',
                '& .ReactPasswordStrength-strength-desc': {
                  marginRight: '-275px',
                  textAlign: 'left'
                }
              }
            }
          }
        },
        '& .ant-form-explain': {
          marginLeft: 10
        }
      },
      '& .confirmChange-button-grid': {
        textAlign: 'center',
      }
    }
  },
};
