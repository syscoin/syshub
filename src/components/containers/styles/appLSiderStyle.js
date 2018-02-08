import palette from './palette';

const primary = palette.primary;
const greyLight = palette.greyLight;
const grey = palette.grey;
const transparentBlack = palette.transparentBlack;

const wraper = {
  //border: '1px solid green',
  display: 'flex',
  flexDirection: 'column',
  justifyAlign: 'flex-start',
  flex: '0 1 15%',
  background: greyLight,
  borderRight: `1px solid ${grey}`,
};
const sider = {
  backgroundColor: primary, //'#ff0045',
};

const mWraper = {
  display: 'flex',
  flexDirection: 'column',
  justifyAlign: 'flex-start',
  flex: '0 1 15%',
  background: greyLight,
  borderRight: `1px solid ${grey}`,
  position: 'absolute',
  height: '100%',
  backgroundColor: transparentBlack
  
}

export default {
  wraper,
  sider,
  mWraper
};
