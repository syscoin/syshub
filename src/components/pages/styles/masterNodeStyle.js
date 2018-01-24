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
      fontWeight: 'lighter'
    },
    '& .masternode-div':{
      background: white,
      padding: 25
    },
  },
}
