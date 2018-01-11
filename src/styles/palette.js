const basicColors = {
  white: '#FFFFFF',
  primary: '#1991CC',
  primaryDark: '#0073a8',
  primaryLight: '#53a5cc',
  greyDark: '#464745',
  grey: '#bdc3c7',
  greyLight: '#F0F2F5',
};

const textColors = {
  textBlue: basicColors.primary,
  text: basicColors.greyDark,
  textLight: basicColors.grey,
};

export default { ...basicColors, ...textColors };
