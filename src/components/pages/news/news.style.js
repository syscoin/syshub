import palette from '../../../styles/palette';
const greyDark = palette.greyDark;
const primary = palette.primary;
const boxShadow = palette.boxShadow;
export default {
  root: {
    '& .title': {
      fontWeight: 300,
      color: greyDark,
      textTransform: 'uppercase',
      padding: 15,
      margin: 'auto',
    },
    '& .iconWraper': { fontSize: 14, cursor: 'pointer', margin: '0 0 5px 0' },
    '& .icon': { color: primary },
    '& .iconTxt': { color: primary },
    '& .iconTxtHide': { color: 'transparent' },
    '& .paper-container': {
      padding: '0px 15px',
      overflowY: 'auto',
      height: '73.5vh',
      borderRadius: '4px',
      backgroundColor: 'white',
      boxShadow: boxShadow,
    }
  },
  mRoot: {
    extend: 'root',
    '& .title': {
      fontSize: '1.9em',
    }
  }
};
