import palette from '../../../styles/palette';

const greyLight = palette.greyLight;

export default {
  wraper: {
    display: 'flex',
    flexDirection: 'column',
    justifyAlign: 'flex-start',
    flex: '2 1 auto',
    background: greyLight,
    minWidth: '100%',
    padding: '0px'
  },
  contentWraper: {
    marginTop: '40px'
  },
  __container: {
    width: '100%'
  }
};
