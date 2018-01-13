import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const grey = palette.textLignt;
const lightColor = palette.textDark;

export default {
  chat_box_container: {
    height: '90vh',
  },
  footerWraper: {
    position: 'absolute',
    bottom: '0px',
  },
  chatHeader: {
    backgroundColor: primary,
    height: '35px',
    paddingTop: '7px',
    textAlign: 'left',
    paddingLeft: '10px',
  },
  chatIcon: {
    width: '20px',
    height: '20px',
  },
  chatHeaderText: {
    color: white,
    marginRight: '52px',
    marginLeft: '6px',
    fontSize: '13px',
  },
  chatList: {
    // border: '1px solid red',
    height: '75.5vh',
    overflowY: 'auto',
  },
  chatContent: {
    padding: '10px',
    textAlign: 'left',
    marginLeft: '10px',
    display: 'block',
  },
  primaryText: {
    color: primary,
  },
  secondaryText: {
    color: grey,
  },
};
