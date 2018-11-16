import palette from '../../../styles/palette';

const primaryDark = palette.primaryDark;
const red = palette.red;
const redHover = palette.redHover;
const green = palette.green;
const greenHover = palette.greenHover;
const gray = palette.grey;
const greyDark = palette.greyDark;
const greyHover = palette.greyHover;

export default {
  root: {
//    border: '1px solid purple',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    margin: '0 15px',
    '& .formLabel': {
      margin: '0 0 5px 0',
      color: primaryDark
    },
    '& .muiButton':{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: '0 15px',
      '&:disabled': {
        '& .acceptIcon, .abstainIcon, .declineIcon': {
          fill: gray
        },
      }
    },
    '& .btnContent': {
      // border: '1px solid red',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '100%'
    },
    '& .accept:hover':{
        background: greenHover,
        '& .voteNumbers': {
          color: greyDark
        }
    },
    '& .decline:hover':{
        background: redHover,
        '& .voteNumbers': {
          color: greyDark
        }
    },
    '& .abstain:hover':{
        background: greyHover,
        '& .voteNumbers': {
          color: greyDark
        }
    },
    '& .btnIcon':{
      // border: '1px solid red',
      flex: '0 1 20%'
    },
    '& .acceptIcon': {
      fill: green
    },
    '& .abstainIcon': {
      fill: greyDark
    },
    '& .declineIcon': {
      fill: red
    },

    '& .voteLabel': {
      // border: '1px solid blue',
      flex: '0 1 35%',
      minWidth: '5em',
      padding: '0 0 0 10px',
      textAlign: 'left',
    },
    '& .voteNumbers': {
      // border: '1px solid green',
      flex: '1 1 auto',
      padding: '0 5px',
      color: gray,
      fontSize: 20,
    },
  }
}