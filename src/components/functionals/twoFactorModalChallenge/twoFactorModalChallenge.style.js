import palette from '../../../styles/palette';

const primary = palette.primary;
const primaryLight = palette.primaryLight;
const greyDark = palette.greyDark;
const greyLight = palette.greyLight;
const red = palette.red;
const green = palette.green;
const white = palette.white;
export default {
  root:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    background: white,
    boxShadow: green,
    padding: 0,
    color:greyDark,
    '& .modalHeaderWrapper': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: primary,
      '& *': {
        color: white
      }
    },
    '& .closeBtn': {
      alignSelf: 'flex-end',
    },
    '& .modalBodyWrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '40px'
    },
    '& .qrCode':{
      width: '300px',
      height: '300px'
    },
    '& .instructions': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    '& .storeBtnWrapper': {
      margin: '10px 0 20px 0'
    },
    '& .gButton': {
      margin: '0 10px'
    },
    '& .aButton': {
      margin: '0 10px'
    },
    '& .inputWrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      '& .codeInput': {
        maxWidth:  '30%',
      },
      '& .verifyCode': {
        margin: '25px 0px 0 20px',
        width: '30%'
      }
    },
    '& .rightIcon': {
      margin: '0 0 0 5px',
    },
  },
  mRoot: {
    extend: 'modalRoot',
  },
}