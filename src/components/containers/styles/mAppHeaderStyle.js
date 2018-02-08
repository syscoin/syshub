import palette from './palette';

const primary = palette.primary;
const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;

export default {
  mRoot: {
    '& .app-bar': {
      boxShadow: 'none',
    },
    '& .header': {
      backgroundColor: primary,
      paddingLeft: 8,
      paddingRight: 8,
    },
    '& .container': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItem: 'center',
      minWidth: '100%',
      padding: '0 0 0 0',
      height: '22vh'
    },
    '& .hdivider ': {
      width: '100%',
      borderTop: `1px solid ${primaryDark}`,
      borderBottom: `1px solid ${primaryLight}`
    },
    '& .header-bitcoin-status': {
      marginBottom: 15,
      padding: '10px 4px 10px 15px',
    },
    '& .name-header': {
      textAlign: 'left',
      padding: 0,
      marginTop: 15,
      paddingLeft: 10,
      paddingRight: 15,

      '& .btn-logout': {
        textTransform: 'capitalize',
        minWidth: 55,
        padding: 0,
        position: 'absolute',
        right: 10,
        top: 45,
        '& .text': {
          color: white
        }
      },
      '& .btn-login': {
        textTransform: 'capitalize',
        minWidth: 55,
        padding: 0,
        position: 'absolute',
        right: 10,
        top: 25,
        '& .text': {
          color: white
        }
      },
      '& .text-span': {
        marginLeft: 15,
        marginBottom: 5,
        display: 'block',
        marginBottom: 5,
        textAlign: 'right',
        '& .TxtRegular': {
          padding: '0 15px',
          color: white,
          padding: '0',
          fontSize: '12px',
        },
        '& .TxtBold': {
          color: white,
          padding: '0 0 0 4px',
          fontSize: '11px',
          fontWeight: 'bold',
        }
      },
    },
    '& .mb-0': {
      marginBottom: 0
    },
    '& .menu-icon': {
      color: white,
      fontSize: '32px'
    }
  }
};
