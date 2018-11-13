import palette from '../../../styles/palette';
const greyDark = palette.greyDark;


export default {
  root: {
    '& .title': {
      fontWeight: 300,
      color: greyDark,
      textTransform: 'uppercase',
      padding: 15,
      margin: 'auto',
    },
    '& .paper-container': {
      padding: '20px 20px',
      overflowY: 'auto',
      height: '80vh',
      overflowX: 'hidden',
      '& .gridList': {
        width: 500,
        height: 450
      }
    }
  },
  mRoot: {
    extend: 'root',
    '& .title': {
    },
    '& .paper-container': {
      overflowX: 'hidden',
      height: 'calc(80vh - 20px)'
    }
  }
};
