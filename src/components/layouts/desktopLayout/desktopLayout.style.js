import palette from '../../../styles/palette';

const grey = palette.grey;
const boxShadow = palette.boxShadow;

export default {
  wrapper: {
    //border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    minWidth: 'calc(100% - 20px)',
    height: '100%',
    borderleft: `1px solid ${grey}`,
    borderRight: `1px solid ${grey}`,

  },
  appContent: {
    height: 'calc(100vh - 140px)',
    marginLeft: 20,
    marginTop: 20,
    width: 'calc(80% - 75px)'

  },
  progressWrapper: {
    margin: '20px 0 0 0',
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
