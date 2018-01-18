import palette from './palette';

const greyDark = palette.greyDark;
const white = palette.white;

export default {
  wraper: {
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    height: '60px',
    width: '100%',
    backgroundColor: greyDark,
  },
  footer: {
    textAlign: 'center',
    fontWeight: 'semibold',
    color: white,
  },
};
