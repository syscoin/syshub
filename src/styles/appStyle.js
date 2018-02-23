import palette from './palette';

const white = palette.white;
const boxShadow = palette.boxShadow;

export default {
  root: {
    height: '100vh',
    backgroundColor: white,
    '& .paper-container':{
      boxShadow: boxShadow
    }
  },
};
