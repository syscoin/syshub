
export default {
  wraper: {
    //border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    minWidth: 'calc(100vw - 20px)',
    height: 'calc(100vh - 125px)',
  },
  appContent: {
    width: 'calc(80vw - 95px)',
    height: '100%',
    overflowY: 'hidden',
    marginLeft: 20,
    marginTop: 10
  },
  appContentWithChatBox: {
    width: 'calc(60vw - 55px)',
    height: 'calc(100vh - 155px)',
    overflowY: 'hidden',
    marginLeft: 20,
    marginTop: 10
  },
  leftSlider:{
    width: '20vw'
  },
  rightSlider: {
    width: '20vw',
    position: 'fixed',
    right: 0
  }
};
