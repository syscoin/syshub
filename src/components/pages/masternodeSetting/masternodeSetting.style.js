import palette from '../../../styles/palette';

const white = palette.white;
const greyDark = palette.greyDark;
const boxShadow = palette.boxShadow;
const greyLight = palette.greyLight;

export default {
  root: {
    '& .title': {
      fontWeight: 300,
      color: greyDark,
      textTransform: 'uppercase',
      padding: 15,
      margin: 'auto',
    },
    '& .masternode-div': {
      background: white,
      padding: 25,
      overflowY: 'auto',
      height: '76.5vh',
      boxShadow: boxShadow,
      '& .heading': {
        borderBottom: `1px solid ${greyLight}`
      },
      '& .add-title': {
        display: 'inline-block',
        fontWeight: 'normal'
      },
    },
  },
  mRoot: {
    extend: 'root',
    '& .title': {
      width: '100%',
    },
    '& .masternode-div': {
      height: 'auto',
      padding: 20
    }
  }
};
