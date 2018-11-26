import palette from '../../../styles/palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;

export default {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& .common': {
      padding: '0 15px',
      color: white,
      fontSize: 14,
      '@media (min-width: 1024px) and (max-width: 1334px)':{
        fontSize: 11,
        padding: '0 15px',
        '& .icon':{
          height: 20
        }
      },
      '& .changeRate': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      '& .icon': {
        height: 25,
        margin: '0px 10px',
      },
      '& .changeValue': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: '0 0 0 1em',
        color: white,
        lineHeight: '1.1em',
      },
    },
    '& .TxtBold': {
      color: white,
      fontWeight: 'bold',
    },
    '& .divider ': {
      height: '75%',
      borderLeft: `1px solid ${primaryDark}`,
      borderRight: `1px solid ${primaryLight}`,
    },
  },

  mRoot: {
    extend: 'root',
    '& .common': {
      color: 'white',
      height: '25px',
      padding: '0',
      fontSize: 12,
      '& .icon': {
        height: 15,
        width: 15
      },
      '& .TxtBold': {
        marginLeft: '5px'
      }
    },
    '& .TxtBold': {
      color: 'white',
      fontWeight: 'bold',
    },
  },
};
