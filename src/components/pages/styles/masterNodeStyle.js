import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

export default {
  root: {
    marginRight: 15,
    '& .title': {
      display: "inline-block",
      fontWeight: 'lighter',
      textTransform: 'uppercase'
    },
    '& .masternode-div':{
      background: white,
      padding: 25,
      overflowY: 'auto',
      height: '80vh',
    },
  },
}
