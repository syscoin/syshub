import palette from './palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;

const wraper = {
  //border: '1px solid lime',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'stretch',
};
const common = {
  //border: '1px solid cyan',
  padding: '0 15px',
  color: white,
};

const TxtRegular = {
  ...common,
  padding: '0',
  fontSize: '1.2em',
};
const TxtBold = {
  ...common,
  padding: '0 0 0 10px',
  fontSize: '1.3em',
  fontWeight: 'bold',
};

const button = {
  border: 'none',
  padding: '0 15px',
};

export default { wraper, common, TxtBold, TxtRegular, button };
