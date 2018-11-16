const basicColors = {
  white: 'rgba(255, 255, 255, 1)',
  primary: 'rgba(25, 145, 204, 1)',
  primaryLight: 'rgba(83, 165, 204, 1)',
  primaryDark: 'rgba(0, 115, 168, 1)',
  primaryHover: 'rgba(25, 145, 204, 0.3)',

  grey: 'rgba(189, 195, 199, 1)',
  greyLight: 'rgba(240, 242, 245, 1)',
  greyDark: 'rgba(70, 71, 69, 1)',
  greyHover: 'rgba(189, 195, 199, 0.3)',
  secondary: 'rgba(26, 188, 156, 1)',
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
