import palette from './palette';

const primary = palette.primary;
const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;

export default {
  mRoot: {
    height: 130,
    width: '100vw',
    '& .app-bar': {
      boxShadow: 'none'
    },
    '& .header': {
      backgroundColor: primary,
      paddingLeft: 8,
      paddingRight: 8
    },
    '& .container': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItem: 'center',
      minWidth: '100%',
      padding: '0 0 0 0',
      height: 135,
      '& .top-header__wrapper': {
        height: 126,
        marginTop: -30,
        marginLeft: -10,
        width: 'calc(100% + 100px)'
      }
    },
    '& .hdivider ': {
      width: '100%',
      borderTop: `1px solid ${primaryDark}`,
      borderBottom: `1px solid ${primaryLight}`
    },
    '& .header-bitcoin-status': {
      marginBottom: 0,
      padding: '8px 0px 0px 15px',
      display: 'inline-block',
      marginTop: 25,
      '& >div': {
        margin: 0,
        paddingTop: 2,
        '& .common': {
          lineHeight: 2
        }
      }
    },
    '& .name-header': {
      textAlign: 'left',
      padding: 0,
      marginTop: 15,
      paddingLeft: 10,
      paddingRight: 15,
      display: 'inline-block',
      position: 'relative',
      width: '32%',
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
        '& .text': {
          color: white
        }
      },
      '& .text-span': {
        display: 'block',
        marginTop: 0,
        textAlign: 'right',
        '& .TxtRegular': {
          color: white,
          padding: '0',
          fontSize: '12px'
        },
        '& .TxtBold': {
          color: white,
          padding: '0 0 0 4px',
          fontSize: '11px',
          fontWeight: 'bold'
        }
      }
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
