import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const grey = palette.grey;
const secondary = palette.secondary;


export default {
  root: {
    '& .title': {
      fontWeight: 'lighter',
    },
    '& .paper-container': {
      padding: '20px 20px',
      overflowY: 'auto',
      height: '80vh',
      '& .gridList': {
        width: 500,
        height: 450,
      }

    }
  },
  mRoot: {
    extend: 'root',
    '& .title': {
      margin: 0,
      padding: 15,
      background: white,
      paddingLeft: 15,
    },
    '& .paper-container': {
      overflowX: 'hidden',
      height: 'auto',
    }
  }






}
