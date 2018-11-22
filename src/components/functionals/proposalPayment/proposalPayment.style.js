import palette from '../../../styles/palette';

const primaryLight = palette.primaryLight;
const gray = palette.grey;
const greyDark = palette.greyDark;

export default {
  root: {
    '& .no-margin': {
      margin: 0,
      '& .heading': {
        fontSize: 20,
        color: greyDark,
        fontWeight: 200
      }
    },
    '& .paymentsView': {
      margin: 0,
      marginTop: 30,
      '& .OnTimePaymentView': {
        flexBasis: '35% !important',
        maxWidth: '26.6%',
        padding: 0,
        marginLeft: '4%',
        fontSize: 14,
        '& .heading': {
          color: gray,
          fontSize: 14,
          marginBottom: 2
        },
        '& .form': {
          '& .FormGroup': {
            '& .input-field': {
              color: primaryLight,
              padding: 5,
              border: '1px solid ' + gray,
              width: '100%'
            },
            '& .input-field::-webkit-input-placeholder': {
              /* Chrome/Opera/Safari */
              color: primaryLight
            },
            '& .input-field::-moz-placeholder': {
              /* Firefox 19+ */
              color: primaryLight
            },
            '& .input-field:-ms-input-placeholder': {
              /* IE 10+ */
              color: primaryLight
            },
            '& .input-field:-moz-placeholder': {
              /* Firefox 18- */
              color: primaryLight
            }
          }
        }
      }
    }
  },
  mRoot: {
    extend: 'root',
    width: '100%',
    '& .no-margin': {
      '&>p': {
        fontSize: 20
      }
    },
    '& .paymentsView': {
      marginTop: 0,
      width: '100%',
      '& .OnTimePaymentView': {
        maxWidth: '100%',
        width: '100%',
        flexBasis: 'inherit',
        marginLeft: 0,
        padding: '5px 0px',
        '& .heading': {
          fontSize: 17
        },
        '& .form': {
          '& .FormGroup': {
            '& .input-field': {
              height: 35,
              width: '100%'
            }
          }
        }
      }
    }
  }
};
