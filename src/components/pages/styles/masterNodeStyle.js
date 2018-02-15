import palette from './palette';

const white = palette.white;
const greyDark = palette.greyDark;
export default {
  root: {
    '& .title': {
      fontWeight: 300,
      color: greyDark,
      textTransform: 'uppercase',
      padding: 15,
      backgroundColor: white,
    },
    '& .masternode-div': {
      background: white,
      padding: 25,
      overflowY: 'auto',
      height: '80vh',
    },
  },
  mRoot: {
    extend: 'root',
    '& .title': {
      width: '100%',
    },
    '& .masternode-div': {
      height: 'auto',
      padding: 20,

    }
  }
}
