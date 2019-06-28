import palette from '../../../styles/palette';

const greyLight = palette.greyLight;

export default {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    padding: '0px',
    background: greyLight
  },
  contentWrapper: {
    position: 'relative',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: greyLight,
    minWidth: '100%',
    height: '100%',
    padding: '0px'
  }
};
