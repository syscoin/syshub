import palette from '../../../styles/palette';

const greyDark = palette.greyDark;
const white = palette.white;

export default {
  wraper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '0px',
    bottom: '0px',
    height: '30px',
    width: '100%',
    backgroundColor: greyDark,
    color: white
  },
  footer: {
    textAlign: 'center',
    fontWeight: 'semibold',
    color: white
  }
};
