import palette from '../../../styles/palette';

const greyLight = palette.greyLight;

export default {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    background: greyLight,
    padding: '0px',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: greyLight,
    minWidth: '100%',
    padding: '0px',
  },
  wrapperHome: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: '80%',
    background: greyLight,
    padding: '0px',
  }
};
