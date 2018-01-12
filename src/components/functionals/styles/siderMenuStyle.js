import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const grey = palette.grey;
const greyLight = palette.greyLight;

const wraper = {
  display: 'flex',
  flexDirection: 'column',
  justifyAlign: 'flex-start',
  width: '100%',
};
const button = {
  height: '50px',
  width: '100%',
  border: 'none',
  textAlign: 'left',
  background: `linear-gradient(${white}, ${greyLight})`,
  border: `1px solid ${greyLight}`,
};

const buttonActive = {
  ...button,
  background: primary,
};

const menuTxt = {
  padding: '0 0 0 20px',
  fontSize: '0.9em',
};

const menuTxtActive = {
  ...menuTxt,
  color: white,
};

export default { wraper, menuTxt, menuTxtActive, button, buttonActive };
