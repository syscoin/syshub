import palette from './palette';

const darkGrey = palette.darkGrey;
const white = palette.white;

export default {
  footerWraper: {
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    height: '60px',
    width: '100%',
    backgroundColor: darkGrey,
  },
  footer: {
    textAlign: 'center',
    fontWeight: 'semibold',
    color: white,
  },
};
