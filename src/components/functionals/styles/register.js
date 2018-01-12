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
    width: '100%',
    margin: 'auto',
  },
  label: {
    padding: '0px 30px',
    fontSize: '18px',
    color: primary,
  },
  formDiv: {
    padding: '25px 20px 35px 180px',
    boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 30px'
  },
  inputDivUsername:{
    marginLeft :'66px'
  },
  inputDivPassword:{
    marginLeft :'68px'
  }
  ,
  input: {
    height: '42px',
    width: '27%',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    padding: '12px 20px',
    fontSize: '20px',
    borderRadius:'3px'
  },
  confirmPasswordinput: {
    height: '42px',
    width: '25%',
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
  registerBtn: {
    borderRadius: '7px',
    width: '13%',
    height :'20px',
    marginRight :'35px'
  },
  registerLoginBtn: {
    borderRadius: '7px',
    width: '25%',
    height :'20px',
    marginRight :'35px'
  },
  forgetLink: {
    padding: '10px 0px 10px 10px',
    fontSize: '16px',
    color: primary
  },
  btnDiv: {
    padding: '25px 0px 25px 10px',
    marginLeft: '20%'
  },
  captcha:{
    marginLeft :'70px'

  },
  captchaImg:{
    width:'29%'
  },
  termsDiv:{
   marginLeft:'20.5%',
   color:darkGrey
  },
  activeTermsText:{

        color: primary,
        fontWeight:"bold"
  },
  checkIcon:{
      width:'23px',
      margin:'0px 15px'
  },
  passwordStrength:{
      fontSize:'16px',
      margin:'10px',
      textTransform: "upperCase",
      color:'#2ecc71'
  }
}