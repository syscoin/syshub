import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import injectSheet from 'react-jss';
import swal from 'sweetalert';

// Import Services
import { fire } from '../../../API/firebase';
import { setFire2FAMethod, getFire2FAstatus, getAuthQRCode, verifyAuthCode } from '../../../API/TwoFA.service';

// import Material-ui components
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

// Import Material-ui Icons
import DoneAll from '@material-ui/icons/DoneAll';
import Close from '@material-ui/icons/Close';

// import custom components
import { isoArray } from '../../../assets/isoCodes';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

// Import Style
import userTwoFactorAuthStyle from './userTwoFactorAuth.style';

// Import Auth libs
const speakeasy = require('speakeasy');
const QRCode = require('qrcode')
const gAuth = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2';
const aAuth = 'https://itunes.apple.com/es/app/google-authenticator/id388497605';

class UserTwoFactorAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: '',
      showModal: false,
      qrCodeURL: '',
      verify: false,
      token: ''
    };

    this.disableAuth = this.disableAuth.bind(this);
    this.enableAuth = this.enableAuth.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    fire.auth().useDeviceLanguage();

    const user = fire.auth().currentUser;
    const twoFAStatus = await getFire2FAstatus(user.uid);
    this.props.set2FA(twoFAStatus);

    if (!twoFAStatus.authSecret) {
      const newStatus = await setFire2FAMethod(user.uid, 'auth', false);
      this.props.set2FA(newStatus);
    }

    if (twoFAStatus.auth) {
      fire.database().ref('MasterNodes/' + user.uid).once('value', snapshot => {
        if (snapshot.val() === null) {
          return;
        }
        let list = [];
        snapshot.forEach(mn => {
          list.push(mn.val());
        });
        user.MasterNodes = list;
        this.props.setCurrentUser(user);
      });
    }
    window.recaptchaVerifierEnable2FAAuth = new fire.auth.RecaptchaVerifier('enable2FAAuth', {
      size: 'invisible',
      callback: response => {
        this.verify = response;
        this.enableAuth();
      }
    });
    
    window.recaptchaVerifierDisable2FAAuth = new fire.auth.RecaptchaVerifier('disable2FAAuth', {
      size: 'invisible',
      callback: response => {
        this.verify = response;
        this.disableAuth();
      }
    });

    window.recaptchaVerifierEnable2FAAuth.render() 
    window.recaptchaVerifierDisable2FAAuth.render()
  }

  modalDidMount() {
    const user = fire.auth().currentUser;
    window.recaptchaVerifierAuthCode = new fire.auth.RecaptchaVerifier('verifyCode', {
      size: 'invisible',
      callback: response => {
        this.verify = response;
        this.verifyAuthCode();
      }
    });
    window.recaptchaVerifierAuthCode.render()
  }

  handleShowModal() {
    const authQrCode = getAuthQRCode();
    
      this.setState({
        showModal: true,
        qrCodeURL: authQrCode.qrCodeURL
      });
  }
  
  handleHideModal() {
    this.setState({
      secret: '',
      qrCodeURL: '',
      showModal: false,
    });
    this.verify = false;
    window.recaptchaVerifierEnable2FAAuth.reset();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleInputChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  async verifyAuthCode () {
    const {token, qrCodeURL} = this.state;
    const secret32 = qrCodeURL.secret.base32;

    verifyAuthCode(secret32, token);
   /*  let user = fire.auth().currentUser;
    const verificationId = this.state.verificationId;
    const phoneCode = this.state.phoneVerify;
    if (!phoneCode) {
      this.handleHideModal();
      swal({
        title: 'Oops...',
        text: 'Please provide your verificatoin code next time. Process canceled',
        icon: 'error'
      });
      return;
    }
    const phoneCredential = await verifyPhoneCode(verificationId, phoneCode);
    if (phoneCredential) {
      user.updatePhoneNumber(phoneCredential);
      const newStatus = await setFire2FAMethod(user.uid, 'sms', true);
      this.props.set2FA(newStatus);
      user = await fire.auth().currentUser;
      this.props.setCurrentUser(user);
      this.handleHideModal();
      swal({
        title: 'Sucess',
        text: `New Phone Number added & Two Factor Authentication Enabled`,
        icon: 'success'
      });
    } */
  }

  async enableAuth() {
    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }
    const user = fire.auth().currentUser;
    const twoFAStatus = await getFire2FAstatus(user.uid)
    console.log('ACZ -->', twoFAStatus);
    
    if (!twoFAStatus.authSecret) {
      this.handleShowModal();
    }

    const newStatus = await setFire2FAMethod(user.uid, 'auth', true);
    this.props.set2FA(newStatus);

    this.verify = false;
    window.recaptchaVerifierEnable2FAAuth.reset();
  }

  async disableAuth() {
    const user = fire.auth().currentUser;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    const newStatus = await setFire2FAMethod(user.uid, 'auth', false);
    this.props.set2FA(newStatus);

    this.verify = false;
    window.recaptchaVerifierDisable2FAAuth.reset();
  }

  async removeSecret() {
    const user = fire.auth().currentUser;
    const newStatus = await setFire2FAMethod(user.uid, 'authSecret', false);
    this.props.set2FA(newStatus);



  }

  render() {
    const { classes, deviceType, app } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const modalStyle = deviceType === 'mobile' ? classes.mModalRoot : classes.modalRoot;

    //const { currentUser } = this.props.app;

    return (
      <Grid
        container
        direction="column"
        className={style}
      >
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.showModal}
          onClose={() => this.handleHideModal()}
          onRendered={() => this.modalDidMount()}
        >
          <div className={modalStyle}>
            <div className="modalHeaderWrapper">
              <IconButton aria-label="Close" className="closeBtn" onClick={() => this.handleHideModal()}>
                <Close fontSize="large"/>
              </IconButton>
              <h1>Two-Factor Authentication</h1>
              <p>You have enabled Two-Factor Authentication for your account, Follow the instruction to complete setup</p>
            </div>
            <div className="modalBodyWrapper">
              <img className="qrCode" src={this.state.qrCodeURL} alt="qrCode"/>
              <div className="instructions">
                <ol>
                  <li>Download and install Google Authenticator</li>
                  <div className="storeBtnWrapper">
                    <a href={gAuth} target="_blank" rel="noopener noreferrer" className="gButton">
                      <img width={113} src={require('../../../assets/img/png_icon_google.png')} alt="gplay"/>
                    </a>
                    <a href={aAuth} target="_blank" rel="noopener noreferrer" className="aButton">
                      <img width={100} src={require('../../../assets/img/png_icon_apple.png')} alt="gplay"/>
                    </a>
                  </div>
                  <li>Scan this Barcode</li>
                  <div className="storeBtnWrapper"></div>
                  <li>Enter Verification Code</li>
                  <div className="inputWrapper">
                    <TextField
                      id="token"
                      label="Code"
                      className="token"
                      value={this.state.token}
                      onChange={this.handleInputChange('token')}
                      margin="normal"
                      variant="outlined"
                      size="small"
                    />
                    <Button
                      id="verifyCode"
                      color="primary"
                      className="verifyCode"
                      key={'gcode'}
                      variant="outlined"
                      size="small"
                      >
                      VERIFY <DoneAll className="rightIcon"/>
                    </Button>
                  </div>
                </ol>
              </div>
            </div>
          </div>
        </Modal> 
        <Grid item md={12} xs={12} className="userTwoFactor">
          <div className="statusWrapper">
            <div className="statusTextSpan">Google<br/>Authenticator:</div>
            {this.props.app.twoFA.auth && <div className="statusEnable"> Enabled </div>}
            {!this.props.app.twoFA.auth && <div className="statusDisable"> Not Enabled <br/>
              <span className="lowSecuritySpan">(Low Security)</span>
            </div>}
          </div>
        </Grid>
        {/* <div className="reCapthaWraper" ref={ref => (this.recaptcha = ref)} /> */}
        <Grid container direction='row' justify='space-between' className="twoFactor-button-grid">
          <Grid item>
            <Button 
            variant= "raised"
            color="primary"
            className="twoFactor-button"
            onClick={() => this.removeSecret()}
            style={{ marginBottom: '15px' }}
            disabled={!app.twoFA.authSecret}
            >
              Remove Secret
            </Button>
          </Grid>
          <Grid item>
            <Button id="disable2FAAuth" color="primary" className={`twoFactor-button ${ this.props.app.twoFA.auth ? 'show':'hide'}`} >Disable 2FA Auth</Button>
            <Button id="enable2FAAuth"  color="primary" className={`twoFactor-button ${!this.props.app.twoFA.auth ? 'show':'hide'}`} >Enable 2FA Auth</Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    set2FA: auth => dispatch(actions.set2FA(auth)),

  };
};

export default connect(stateToProps, dispatchToProps)(
  injectSheet(userTwoFactorAuthStyle)(UserTwoFactorAuth)
);
