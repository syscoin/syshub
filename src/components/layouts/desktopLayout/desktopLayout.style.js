import palette from '../../../styles/palette';

const grey = palette.grey;
const greyLight = palette.greyLight;
const boxShadow = palette.boxShadow;

export default {
  appContainer: {
    display: 'grid',
    gridTemplateColumns: '8% auto 8%',
    gridTemplateRows: '66px auto 60px',
    gridTemplateAreas: `
    "header header header"
    ".      main   . "
    "footer footer footer"`,
    width: '100%',
    height: '100%'
  },
  headerContainer: {
    gridArea: 'header'
  },
  footerContainer: {
    gridArea: 'footer'
  },
  mainContainer: {
    gridArea: 'main',
    display: 'grid',
    gridTemplateColumns: '24% auto',
    gridTemplateRows: '1fr',
    gridTemplateAreas: `
    "menu content"`,
    alignItems: 'start',
    width: '100%',
    background: `${greyLight}`,
    borderleft: `1px solid ${grey}`,
    borderRight: `1px solid ${grey}`
  },
  menuContainer: {
    gridArea: 'menu',
    width: '100%',
    height: '100%',
    maxWidth: '330px'
  },
  contentContainer: {
    gridArea: 'content',
    width: '100%',
    height: '100%',
    maxWidth: '1205px'
  },
  progressWrapper: {
    margin: '30px auto',
    width: '80%'
  },
  appContentWithChatBox: {
    width: 'calc(61.5% - 20px)',
    height: 'calc(100vh - 80px)',
    marginLeft: 20,
    marginTop: 20,
    boxShadow: boxShadow,
    '@media (minWidth: 1600px)': {
      width: 'calc(56% - 20px)'
    }
  },
  rightSlider: {
    right: 0,
    width: '22%',
    marginLeft: 20,
    position: 'fixed'
  }
};
