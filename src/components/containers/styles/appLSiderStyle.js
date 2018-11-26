import palette from '../../../styles/palette';

const primary = palette.primary;
const greyLight = palette.greyLight;
const grey = palette.grey;
const transparentBlack = palette.transparentBlack;

const wraper = {
  display: 'flex',
  flexDirection: 'column',
  justifyAlign: 'flex-start',
  flex: '0 1 15%',
  background: greyLight,
  borderRight: `1px solid ${grey}`,
  borderLeft: `1px solid ${grey}`,
};
const sider = {
  backgroundColor: primary,
};

const mWraper = {
  display: 'flex',
  flexDirection: 'column',
  justifyAlign: 'flex-start',
  flex: '0 1 15%',
  background: greyLight,
  borderRight: `1px solid ${grey}`,
  position: 'fixed',
  height: '100%',
  backgroundColor: transparentBlack,
  width: '100%',
};

export default {
  wraper,
  sider,
  mWraper
};