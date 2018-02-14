import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;

export default {
  root: {
    marginTop: '20px',
    width: '100%',
    margin: 0,
    borderBottom: 'thin solid ' + greyDark,
    '& .new-header-grid': {
      '& img': {
        height: '100%',
        width: '100%',
      },
      '& .cover': {
        position: 'relative',
        marginTop: 20,
        '& .info': {
          position: 'absolute',
          bottom: 0,
          marginLeft: 20,
        },
      },

      '& .title': {
        color: primary,
        margin: '10px 0 0 0',
        fontSize: '1.7em',
        fontWeight: 700,
      },
      '& .sub-title': {
        fontSize: 20,
        color: white,
        fontWeight: 100,
      },
      '& .author': {
        margin: '0px 10px',
        '& .info': {
          display: 'inline-block',
          width: 'calc(100% - 100px)',
          marginLeft: 20,
          marginTop: 20,
          verticalAlign: 'super',
          color: greyDark,
          margin: '0px 15px',
          '& .date': {
            color: greyDark,
            marginBottom: 0,
          },
          '& .by': {
            color: greyDark,
          },
        },
      },
    },
  },
  mRoot: { 
    extend: 'root', 
    marginBottom: 20
  },
};
