import palette from './palette';

const white = palette.white;

export default {
  root: {
    '& .title': {
      display: 'inline-block',
      fontWeight: 'lighter',
      textTransform: 'uppercase'
    },
    '& .masternode-div': {
      background: white,
      padding: 25,
      overflowY: 'auto',
      height: '80vh'
    }
  },
  mRoot: {
    extend: 'root',
    '& .title': {
      width: '100%',
      margin: 0,
      padding: '10px 20px',
      fontSize: 25,
      backgroundColor: white
    },
    '& .masternode-div': {
      height: 'auto',
      padding: 20
    }
  }
};
