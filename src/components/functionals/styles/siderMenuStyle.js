import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const grey = palette.grey;
const greyLight = palette.greyLight;

export default {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyAlign: 'flex-start',
    width: '100%',
    marginTop :97,
    height:'100vh'
  },
  button: {
    height: '50px',
    width: '100%',
    border: 'none',
    textAlign: 'left',
    background: `linear-gradient(${white}, ${greyLight})`,
    borderWidth: '1px 0 0 0',
    borderStyle: 'solid',
    borderColor: grey,
    '&:hover': {
      background: `linear-gradient(${greyLight}, ${white})`
    }
  },
  buttonActive: {
    extend: 'button',
    background: primary,
    '&:hover': {
      background: primary
    }
  },
  lastBorder: {
    borderTop: `1px solid ${grey}`
  },

  menuTxt: {
    padding: '0 0 0 20px',
    fontSize: '0.9em'
  },

  menuTxtActive: {
    extend: 'menuTxt',
    color: white
  },
  mRoot: {
    extend: 'root',
    marginTop: 0,

  }
};
