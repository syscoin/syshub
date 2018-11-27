import palette from '../../../styles/palette';

const primary = palette.primary;
const white = palette.white;
const boxShadow = palette.boxShadow;
const grey = palette.grey;
const greyLight = palette.greyLight;
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
      '& .linkWrapper':{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '10px 0 0 0',
        
      },
      '& .gridCardWrapper':{
      },
      '& .girdCard':{
        '&>div': {
          borderRadius: '10px',
          backgroundColor: grey,
        }
      },
      '& .image':{
        transition: 'all 1s',
        '&:hover':{
          width: '90%',
        }
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
