import palette from './palette';

const primary = palette.primary;
const greyLight = palette.greyLight;
const grey = palette.grey;

const wraper = {
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
