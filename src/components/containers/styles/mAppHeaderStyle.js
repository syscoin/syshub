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
      width: '110%',
      borderTop: `1px solid ${primaryDark}`,
      borderBottom: `1px solid ${primaryLight}`
    }
  }
};
