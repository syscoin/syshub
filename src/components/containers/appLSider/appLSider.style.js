import palette from '../../../styles/palette';

const greyLight = palette.greyLight;
const grey = palette.grey;
const transparentBlack = palette.transparentBlack;

const wrapper = {
  display: 'grid',
  gridTemplateColumns: 'auto',
  gridTemplateRows: 'auto',
  width: '100%',
  height: '100%',
  background: greyLight,
  borderRight: `1px solid ${grey}`,
  borderLeft: `1px solid ${grey}`
};

const mWrapper = {
  display: 'flex',
  flexDirection: 'column',
  justifyAlign: 'flex-start',
  flex: '0 1 15%',
  background: greyLight,
  borderRight: `1px solid ${grey}`,
  position: 'fixed',
  height: '100%',
  backgroundColor: transparentBlack,
  width: '100%'
};

export default {
  wrapper,
  mWrapper
};
