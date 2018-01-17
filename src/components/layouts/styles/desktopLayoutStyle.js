import palette from './palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;

export default {
  wraper: {
    marginTop:'50px',
    //border: '1px solid red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    minWidth: 'calc(100vw - 20px)',
  },
  appContent: {
    width: 'calc(60vw - 60px)',
    marginLeft: '20px'
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
