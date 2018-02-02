import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const grey = palette.textLignt;

export default {
  root: {
    '& .welcome-box__wrapper': {
      height: '100px',
    },
    listStyleType: 'disc',
    '& .Paper': {
      minHeight: '100px',
      width: '100px',
      margin: '20px 0px',
      display: 'inline-block',
      boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 30px',
      width: '100%',
      padding: '20px',

      '& .heading': {
        color: '#3498db',
      },
      '& .logoDiv': {
        textAlign: 'center',
        textAlign: 'center',
        '& img': {
          width: '100%',
        },
      },
      '& .addvertiseText': {
        marginTop: '20px',
        fontSize: '16px',
        '& .wellcomBoxTextList': {
          paddingLeft: '25px',
          listStyleType: 'disc',
        },
        '& .listItem': {
          padding: '10px 0px',
        },
      },

      '& .joinBtn': {
        textAlign: 'right',
        '& .btnText': {
          color: '#ffff',
        },
        '& .btn': {
          borderRadius: '8px',
          background: primary,
        },
      },
    },
  },
  mRoot: {
    extend: 'root',
    "& .Paper": {
      marginTop: '100px',
      padding: '30px'
    },
    '& .joinBtn': {
      textAlign: 'center !important'
    },

  },
};
