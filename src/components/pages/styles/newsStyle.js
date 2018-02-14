import palette from './palette';

const primary = palette.primary;

export default {
  root: {
    '& .title': {
      fontWeight: 'lighter',
    },
    '& .iconWraper': { fontSize: 14, cursor: 'pointer' },
    '& .icon': { color: primary },
    '& .iconTxt': { color: primary },
    '& .paper-container':{
      padding: '0px 15px',
      overflowY: 'auto',
      height: '80vh',
    }
  },
};
