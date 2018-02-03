import palette from './palette';

const greyDark = palette.greyDark;
const white = palette.white;

export default {
  root: {
    left: '0px',
    bottom: '0px',
    width: '100%',
    '& .footer': {
      height: '60px',
      textAlign: 'center',
      fontWeight: 'semibold',
      color: white,
      backgroundColor: greyDark
    }
  }
};
