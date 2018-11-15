import palette from '../../../../styles/palette';

const primaryDark = palette.primaryDark;
const primaryLight = palette.primaryLight;
const white = palette.white;
const gray = palette.grey;

export default {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '& .formControl':{
    },
    '& .formLabel': {
      color: primaryDark
    },
    '& .radioGroup': {
    },
    '& .formControlLabel': {
      color: 'red',
      height: '30px !important',
      margin: '0 0 0 0'
    },
    '& .radioRoot':{
      color: primaryLight
    }
  }
}