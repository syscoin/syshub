const basicColors = {
  white: '#FFFFFF',
  primary: '#1991CC',
  primaryDark: '#0073a8',
  primaryLight: '#53a5cc',
  greyDark: '#464745',
  grey: '#BDC3C7',
  greyLight: '#F0F2F5',
  secondary: '#1ABC9C',
  red: '#D61414',
  green: '#97CB54',
  transparentBlack: 'rgba(0, 0, 0, 0.70)',
  boxShadow: '-1px 18px 38px -18px rgba(0,0,0,0.25)'
};

const themeColors = {
  textBlue: basicColors.primary,
  text: basicColors.greyDark,
  textLight: basicColors.grey,
};

export default { ...basicColors, ...themeColors };
