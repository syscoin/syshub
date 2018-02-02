import palette from './palette';

const primary = palette.primary;
const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;

export default {
  mRoot: {
    '& .divider': {
      height: '100%',
      borderLeft: `1px solid ${primaryDark}`,
      borderRight: `1px solid ${primaryLight}`
    },
    '& .align-center': {
      textAlign: 'center'
    }
  }
};
