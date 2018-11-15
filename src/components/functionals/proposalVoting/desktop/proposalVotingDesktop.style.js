import palette from '../../../../styles/palette';

const primaryDark = palette.primaryDark;
const primary = palette.primaryLight;
const red = palette.red;
const green = palette.green;
const white = palette.white;
const gray = palette.grey;
const text = palette.text;

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
    '& .acceptRadio>span>svg':{
      fill: green
    },
    '& .declineRadio>span>svg':{
      fill: red
    },
    '& .abstainRadio>span>svg':{
      fill: primary
    },
    '& .labelWrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    '& .voteLabel': {
      minWidth: '4em'
    },
    '& .voteNumbers': {
      color: gray,
      fontSize: 20,
    },

  }
}