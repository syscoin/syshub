import Palette from './Palette';

const darkGrey = Palette.darkGrey;
const white = Palette.white;

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
