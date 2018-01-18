import palette from './palette';

const primary = palette.primary;
const white = palette.white;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const secondary = palette.secondary;

export default {
  root: {
    marginTop:"6%",
    marginLeft: "4%",
    '& .heading':{
      color:greyDark,
      fontSize:20,
      marginBottom:20,
    }

  },

};
