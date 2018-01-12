import AppPalette from '../../../styles/Palette';

const primary = AppPalette.primary;
const white  = AppPalette.white;
const darkGrey = AppPalette.darkGrey;
const lightGrey = AppPalette.lightGrey;

export default {
  mainContainer: {
    padding: '10px 0px 0px 20px',
    width: 'calc(100% - 20px)'
  },
  mainheading:{
    color : darkGrey
  },
  form: {
    padding: '20px',
    width: '50%',
    margin: 'auto',
  },
  label: {
    padding: '0px 30px',
    fontSize: '18px',
    color: primary,
  },
  formDiv: {
    padding: '100px 20px',
    boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 30px'
  },
  input: {
    height: '42px',
    width: '60%',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    padding: '12px 20px',
    fontSize: '20px',
    borderRadius:'3px'
  },
  btnText: {
    color: white,
    fontSize: '16px',
    textTransform: "capitalize"
  },
  btn: {
    borderRadius: '7px',
    width: '30%',
    height :'20px'
  },
  forgetLink: {
    padding: '10px 0px 10px 10px',
    fontSize: '16px',
    color: primary
  },
  btnDiv: {
    padding: '25px 0px 25px 10px',
    textAlign: 'center',
    marginLeft: '80px'
  },
  captcha:{

  }
}
