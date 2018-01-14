import palette from './palette';

const white = palette.white;
const primary = palette.primary;
const grey = palette.textLignt;
const lightColor = palette.textDark;

export default {
  chat_box_container: {
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
    width: '25px',
    height: '20px',
  },
  chatHeaderText: {
    color: white,
    marginRight: '52px',
    marginLeft: '6px',
    fontSize: '13px',
  },
  chatList: {
    height: 'calc(100vh - 230px)',
    overflowY: 'auto',
  },
  chatContent: {
    padding: '10px',
    textAlign: 'left',
    marginLeft: '10px',
    display: 'block',
  },
  textBox: {
    border: 'thin solid ' + grey,
    backgroundColor: white,
    '&>div': {
      width: 'calc(100% - 40px)',
      marginLeft: '20px'
    },
    '& ::before': {
      backgroundColor: 'transparent'
    }
  },
  primaryText: {
    color: primary,
  },
  secondaryText: {
    color: grey,
  },
};
