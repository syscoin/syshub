import palette from '../../../styles/palette';

const white = palette.white;
const red = palette.red;
const green = palette.green;
const greenLight = palette.greenLight;
const greenHover = palette.greenHover;
const greyLight = palette.greyLight;
const greyDark = palette.greyDark;

export default {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .proposalProgressWrapper': {
      position: 'relative',
      width: '100px',
      height: '100px'
    },
    '& .proposalProgressButton': {
      backgroundColor: white,
      border: `11px solid ${greyLight}`,
      position: 'absolute',
      top: 1,
      left: 1,
      marginTop: 0,
      marginLeft: 0,
      width: '100%',
      height: '100%',
      boxShadow: 'none',
      '&.funded': {
        backgroundColor: greenHover
      }
    },
    '& .proposalProgressInner': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '& .proposalProgressIcon': {
      width: '49%',
      height: '49%',
      margin: '3px 0 0 0'
    },
    '& .proposalProgressPercentage': {
      position: 'absolute',
      top: '10%',
      margin: '10px 0 0 0',
      fontSize: '1.9em',
      fontWeight: 'bold',
      color: `${greyDark}`
    },
    '& .proposalProgressStatus': {
      position: 'absolute',
      top: '63%',
      margin: '0 0 0 0',
      fontSize: '0.8em',
      fontWeight: 'bold',
      color: `${greyDark}`
    },
    '& .proposalProgress': {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 0,
      '&.unfunded': {
        '&>svg>circle': {
          stroke: red
        }
      },
      '&.passing': {
        '&>svg>circle': {
          stroke: greenLight
        }
      },
      '&.funded': {
        '& svg>circle': {
          stroke: greenLight
        }
      }
    },
    '& .proposalProgressInfo': {
      '&.funded': {
        fontWeight: 'bold',
        color: green
      }
    }
  }
};
