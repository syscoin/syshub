import palette from './palette';

const primary = palette.primary;
const greyLight = palette.greyLight;
const grey = palette.grey;

const wraper = {
  display: 'flex',
  flexDirection: 'column',
  justifyAlign: 'flex-start',
  width: '15%',
  background: greyLight,
  borderRight: `1px solid ${grey}`,
};
const sider = {
  backgroundColor: primary, //'#ff0045',
};

export default {
  wraper,
  sider,
};
