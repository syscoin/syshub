const basicColors = {
  white: '#FFFFFF',
  primary: 'rgba(25, 145, 204, 1)',
  primaryDark: '#0073a8',
  primaryLight: '#53a5cc',
  primaryHover: 'rgba(25, 145, 204, 0.3)',
  greyDark: '#464745',
  grey: '#BDC3C7',
  greyLight: '#F0F2F5',
  secondary: '#1ABC9C',
  red: 'rgba(214, 20, 20, 1)',
  redHover: 'rgba(214, 20, 20, 0.3)',
  green: 'rgba(151, 203, 84, 1)',
  greenHover: 'rgba(151, 203, 84, 0.3)',
  transparentBlack: 'rgba(0, 0, 0, 0.70)',
  boxShadow: '-1px 18px 38px -18px rgba(0,0,0,0.25)',



};

const themeColors = {
  textBlue: basicColors.primary,
  text: basicColors.greyDark,
  textLight: basicColors.grey,
};

export default { ...basicColors, ...themeColors };
