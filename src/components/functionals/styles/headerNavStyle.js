import palette from './palette';

const white = palette.white;

export default {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    '& .common': {
      color: white,
      padding: '0 15px',
      fontSize: 14,
      '& .icon': {
        height: 25,
      },
      '& .TxtRegular': {
        color: white,
        padding: '0',
        fontSize: '1.2em',
      },
      '& .TxtBold': {
        color: white,
        padding: '0 0 0 10px',
        fontSize: '1.3em',
        fontWeight: 'bold',
      },
      '& .button': {
        border: 'none',
        padding: '0 15px',
        '& img': {
          height: 25,
        },
      },
      '& .login-btn , .logout-btn': {
        padding: 0,
        '& div': {
          fontSize: 15,
          color: white,
        },
      },
    },
  },
  mRoot: { extend: 'root' },
};
