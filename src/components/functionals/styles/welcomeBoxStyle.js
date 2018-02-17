import palette from './palette';
const primary = palette.primary;

export default {
  root: {
    boxShadow: '-1px 18px 38px -18px rgba(0, 0, 0, 0.25)',
    '& .welcome-box__wrapper': {
      height: '100px'
    },
    listStyleType: 'disc',
    '& .Paper': {
      minHeight: '100px',
      width: '100%',
      display: 'inline-block',
      boxShadow: '-1px 18px 38px -18px rgba(0,0,0,0.25)',
      padding: '20px',

      '& .heading': {
        color: '#3498db'
      },
      '& logo': {
      },
      '& .logoDiv': {
        textAlign: 'center',
        '& img': {
          width: '60%'
        }
      },
      '& .addvertiseText': {
        marginTop: '20px',
        fontSize: '16px',
        '& .wellcomBoxTextList': {
          paddingLeft: '25px',
          listStyleType: 'disc'
        },
        '& .listItem': {
          padding: '10px 0px'
        }
      },

      '& .joinBtn': {
        textAlign: 'right',
        '& .btnText': {
          color: '#ffff'
        },
        '& .btn': {
          borderRadius: '8px',
          background: primary
        }
      }
    },
    '& .tile__wrapper': {
      height: '100% !important',
      '&.logo': {
        marginTop: 55
      }
    }
  },
  mRoot: {
    extend: 'root',
    '& .Paper': {
      padding: '30px',
      '& .heading': {
        fontSize: 22,
        textAlign: 'center'
      }
    },
    '& .joinBtn': {
      textAlign: 'center !important'
    },
    '& .tile__wrapper': {
      '&.logo': {
        marginTop: 5
      }
    }
  }
};
