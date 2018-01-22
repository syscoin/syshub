import palette from './palette';

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
      fontSize: 12,
      fontWeight: 100,
      '& .icon': {
        height: 22,
        margin: '0px 10px',
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
};
