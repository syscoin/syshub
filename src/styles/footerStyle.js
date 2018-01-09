import myPalette from './colorPalette';

const darkGrey = myPalette.darkGrey;
const white = myPalette.white;

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
