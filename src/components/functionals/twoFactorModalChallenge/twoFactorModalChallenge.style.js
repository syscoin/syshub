import palette from '../../../styles/palette';

const primary = palette.primary;
const greyDark = palette.greyDark;
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
    borderRadius: '0',
    padding: 0,
    color:greyDark,
    '& .modalHeaderWrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '15px 40px 15px 20px',
      backgroundColor: primary,
      '& *': {
        color: white
      }
    },
    '& .closeBtn': {
      position: 'absolute',
      top: 0,
      right: 0,
      alignSelf: 'flex-end',
    },
    '& .modalTitle': {
      margin: 0,
      padding: '0 50px 0 0'
    },
    '& .modalSubTitle': {
      margin: 0,
      padding: '10px 0 0 5px'
    },
    '& .modalBodyWrapper': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '40px'
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
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      margin: '0 0 0 0',
      '& .codeInput': {
        maxWidth:  '40%',
      },
      '& .fullWidth': {
        maxWidth: '100%'
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