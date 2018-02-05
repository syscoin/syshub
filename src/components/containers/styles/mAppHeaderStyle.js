import palette from './palette';

const primary = palette.primary;
const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;

export default {
  mRoot: {
    '& .header': {
      backgroundColor: primary
    },
    '& .container': {
      // border: '1px solid red',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItem: 'center',
      minWidth: '100%',
      padding: '0 0 0 0'
    },
    '& .hdivider ': {
      width: '100%',
      borderTop: `1px solid ${primaryDark}`,
      borderBottom: `1px solid ${primaryLight}`
    },
    '& .header-bitcoin-status': {
      padding: '10px 4px',
    },
    '& .name-header': {
      textAlign: 'left',
      padding: 0,
      marginTop :20,
      paddingLeft:10,
      '& .btn': {
        textTransform: 'capitalize',
        minWidth: 55,
        padding: 0,
        '& .text': {
          color: white
        }
      },
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
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        maxWidth: 70,
        display: 'inline-block',
        overflowY: 'hidden',
        height: 35
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
