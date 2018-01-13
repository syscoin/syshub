import AppPalette from './palette';

const primary = AppPalette.primary;
const white = AppPalette.white;
const darkGrey = AppPalette.darkGrey;
const lightGrey = AppPalette.lightGrey;

export default {
  mainContainer: {
    padding: '10px 0px 0px 20px',
    width: 'calc(100% - 20px)',
  },
  mainheading: {
    color: darkGrey,
  },
  form: {
    padding: '20px',
    width: '100%',
    margin: 'auto',
  },
  label: {
    padding: '0px 34px',
    fontSize: '16px',
    color: primary,
  },
  formDiv: {
    padding: '25px 20px 35px 180px',
    boxShadow: 'rgba(0, 0, 0, 0.20) 0px 5px 30px',
  },
  inputDivUsername: {
    marginLeft: '66px',
  },
  inputDivPassword: {
    marginLeft: '68px',
  },
  input: {
    height: '42px',
    width: '30%',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    padding: '12px 20px',
    borderRadius: '3px',
  },
  confirmPasswordinput: {
    height: '42px',
    width: '28%',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    padding: '12px 20px',
    borderRadius: '3px',
    marginLeft: '8px',
  },
  btnText: {
    color: white,
    fontSize: '16px',
    textTransform: 'capitalize',
  },
  registerBtn: {
    borderRadius: '7px',
    width: '16%',
    height: '20px',
    marginRight: '20px',
    padding: '9px',
  },
  registerLoginBtn: {
    borderRadius: '7px',
    width: '21%',
    height: '20px',
    marginRight: '35px',
  },
  forgetLink: {
    padding: '10px 0px 10px 10px',
    fontSize: '16px',
    color: primary,
  },
  btnDiv: {
    padding: '25px 0px 25px 0px',
    marginLeft: '16.2%',
  },
  captchaWrapper: {
    marginLeft: '70px',
    '&>label': {
      verticalAlign: 'top',
    },
    '&>#g-recaptcha': {
      display: 'inline-block',
      marginLeft: '10px',
    },
  },
  captchaImg: {
    width: '29%',
  },
  termsDiv: {
    marginLeft: '18%',
    color: darkGrey,
    fontSize: '16px',
  },
  activeTermsText: {
    color: primary,
    fontWeight: 500,
  },
  checkIcon: {
    width: '23px',
    margin: '0px 15px',
    verticalAlign: 'text-bottom',
  },
  passwordStrength: {
    fontSize: '16px',
    margin: '10px',
    textTransform: 'upperCase',
    color: '#2ecc71',
  },
};
