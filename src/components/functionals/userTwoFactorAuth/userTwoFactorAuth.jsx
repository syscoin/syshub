import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import injectSheet from 'react-jss';
import swal from 'sweetalert';

// Import Services
import { fire } from '../../../API/firebase';
import { setFire2FAMethod, getFire2FAstatus, getAuthQRCode, verifyAuthCode, saveAuthSecret, getAuthSecret } from '../../../API/TwoFA.service';

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
      token: '',
      tokenInputError: false,
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

    window.recaptchaVerifierRemoveSecret = new fire.auth.RecaptchaVerifier('removeSecret', {
      size: 'invisible',
      callback: response => {
        this.verify = response;
        this.removeSecret();
      }
    });

    window.recaptchaVerifierEnable2FAAuth.render() 
    window.recaptchaVerifierDisable2FAAuth.render()
    window.recaptchaVerifierRemoveSecret.render()
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
    const user = fire.auth().currentUser;
    const authQrCode = getAuthQRCode(user.email);
      this.setState({
        showModal: true,
        qrCodeURL: authQrCode.qrCodeURL,
        secret: authQrCode.secret
      });
  }
  
  handleHideModal() {
    this.setState({
      secret: '',
      qrCodeURL: '',
      showModal: false,
      qrCodeURL: '',
      token: '',
      tokenInputError: false,
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
      tokenInputError: false
    });
  };

  async verifyAuthCode () {
    const {token, secret} = this.state;
    window.recaptchaVerifierAuthCode.reset();

    const codeVerified = verifyAuthCode(secret, token);
    console.log('ACZ codeVerified -->', codeVerified);

    if(!codeVerified) {
      this.setState({
        tokenInputError: true
      });
      this.verify = false;
    return;
    }

    const user = fire.auth().currentUser;
    const newStatus = await saveAuthSecret(secret, user.uid);
    this.props.set2FA(newStatus);
    this.handleHideModal();
  }

  async enableAuth() {

    window.recaptchaVerifierEnable2FAAuth.reset();
    
    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      this.verify = false;
      return;
    }
    this.verify = false;

    const user = fire.auth().currentUser;
    const twoFAStatus = await getFire2FAstatus(user.uid)

    if (!twoFAStatus.authSecret) {
      this.handleShowModal();
      return;
    }

    const newStatus = await setFire2FAMethod(user.uid, 'auth', true);
    this.props.set2FA(newStatus);

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

    const secret = await getAuthSecret(user.uid);
    console.log('ACZ secret -->', secret);

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

    return (
      <Grid
        container
        direction="column"
        className={style}
      >
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableBackdropClick
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
              <p>You have enabled Two-Factor Authentication for your account,<br/> Follow the instruction to complete setup</p>
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
                      error={this.state.tokenInputError}
                      id="token"
                      label="Code"
                      helperText={this.state.tokenInputError? 'Code do not match!':' '}
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
              id="removeSecret"
              color="primary"
              className="twoFactor-button"
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
