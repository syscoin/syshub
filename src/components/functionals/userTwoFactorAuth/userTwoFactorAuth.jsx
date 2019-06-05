import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import actions from '../../../redux/actions';
import injectSheet from 'react-jss';
import swal from 'sweetalert';

//Import provider HOC's
import { withFirebase } from '../../../providers/firebase';

// Import Services
import {
  getAuthQRCode,
  verifyAuthCode
} from '../../../API/syscoin/twoFAAuthenticator.service';

// import Material-ui components
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

// Import Material-ui Icons
import DoneAll from '@material-ui/icons/DoneAll';
import Close from '@material-ui/icons/Close';

// Import Style
import userTwoFactorAuthStyle from './userTwoFactorAuth.style';

// Import Auth Apps
const gAuth =
  'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2';
const aAuth =
  'https://itunes.apple.com/es/app/google-authenticator/id388497605';

class UserTwoFactorAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: '',
      gAuthSecret: '',
      showModal: false,
      qrCodeURL: '',
      token: '',
      tokenInputError: false
    };

    this.disableAuth = this.disableAuth.bind(this);
    this.enableAuth = this.enableAuth.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  // add Firebase as global var in component
  firebase = this.props.firebase;

  async componentDidMount() {
    this.firebase.useDeviceLanguage();

    const user = await this.firebase.getCurrentUser();
    const twoFAStatus = await this.firebase.getFire2FAstatus(user.uid);
    this.props.set2FA(twoFAStatus);

    if (!twoFAStatus.authSecret) {
      const newStatus = await this.firebase.setFire2FAMethod(
        user.uid,
        'auth',
        false
      );
      this.props.set2FA(newStatus);
    }

    if (twoFAStatus.auth) {
    }

    window.recaptchaVerifierEnable2FAAuth = this.firebase.newRecaptchaVerifier(
      'enable2FAAuth',
      {
        size: 'invisible',
        callback: response => {
          this.verify = response;
          this.enableAuth();
        }
      }
    );

    window.recaptchaVerifierDisable2FAAuth = this.firebase.newRecaptchaVerifier(
      'disable2FAAuth',
      {
        size: 'invisible',
        callback: response => {
          this.verify = response;
          this.disableAuth();
        }
      }
    );

    window.recaptchaVerifierRemoveSecret = this.firebase.newRecaptchaVerifier(
      'removeSecret',
      {
        size: 'invisible',
        callback: response => {
          this.verify = response;
          this.removeSecret();
        }
      }
    );

    window.recaptchaVerifierEnable2FAAuth.render();
    window.recaptchaVerifierDisable2FAAuth.render();
    window.recaptchaVerifierRemoveSecret.render();
  }

  modalDidMount() {
    window.recaptchaVerifierAuthCode = this.firebase.newRecaptchaVerifier(
      'verifyCode',
      {
        size: 'invisible',
        callback: response => {
          this.verify = response;
          this.verifyAuthCode();
        }
      }
    );
    window.recaptchaVerifierAuthCode.render();
  }

  async handleShowModal() {
    const user = await this.firebase.getCurrentUser();
    const { secret, gAuthSecret, qrCodeURL } = getAuthQRCode(user.email);
    this.setState({
      showModal: true,
      qrCodeURL,
      secret,
      gAuthSecret
    });
  }

  handleHideModal() {
    this.setState({
      showModal: false,
      secret: '',
      gAuthSecret: '',
      qrCodeURL: '',
      token: '',
      tokenInputError: false
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

  async verifyAuthCode() {
    const { token, secret } = this.state;
    window.recaptchaVerifierAuthCode.reset();

    const codeVerified = verifyAuthCode(secret, token);

    if (!codeVerified) {
      this.setState({
        tokenInputError: true
      });
      this.verify = false;
      return;
    }

    const user = await this.firebase.getCurrentUser();
    let newStatus = await this.firebase.saveAuthSecret(secret, user.uid);
    newStatus = await this.firebase.setFire2FAMethod(user.uid, 'sms', false);
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

    const user = await this.firebase.getCurrentUser();
    const twoFAStatus = await this.firebase.getFire2FAstatus(user.uid);

    if (!twoFAStatus.authSecret) {
      this.handleShowModal();
      return;
    }

    let newStatus = await this.firebase.setFire2FAMethod(
      user.uid,
      'auth',
      true
    );
    newStatus = await this.firebase.setFire2FAMethod(user.uid, 'sms', false);
    this.props.set2FA(newStatus);
  }

  async disableAuth() {
    const user = await this.firebase.getCurrentUser();

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    const newStatus = await this.firebase.setFire2FAMethod(
      user.uid,
      'auth',
      false
    );
    this.props.set2FA(newStatus);

    this.verify = false;
    window.recaptchaVerifierDisable2FAAuth.reset();
  }

  async removeSecret() {
    const user = await this.firebase.getCurrentUser();
    const newStatus = await this.firebase.setFire2FAMethod(
      user.uid,
      'authSecret',
      false
    );
    this.props.set2FA(newStatus);
    window.recaptchaVerifierRemoveSecret.reset();
  }

  render() {
    const { classes, deviceType, app } = this.props;

    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const modalStyle =
      deviceType === 'mobile' ? classes.mModalRoot : classes.modalRoot;

    return (
      <Grid container direction="column" className={style}>
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
              <IconButton
                aria-label="Close"
                className="closeBtn"
                onClick={() => this.handleHideModal()}
              >
                <Close fontSize="large" />
              </IconButton>
              <h1>Two-Factor Authentication</h1>
              <p>
                You have enabled Two-Factor Authentication for your account,
                <br /> Follow the instruction to complete setup
              </p>
            </div>
            <div className="modalBodyWrapper">
              <img className="qrCode" src={this.state.qrCodeURL} alt="qrCode" />
              <div className="instructions">
                <ol>
                  <li>Download and install Google Authenticator</li>
                  <div className="storeBtnWrapper">
                    <a
                      href={gAuth}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gButton"
                    >
                      <img
                        width={113}
                        src={require('../../../assets/img/png_icon_google.png')}
                        alt="gplay"
                      />
                    </a>
                    <a
                      href={aAuth}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aButton"
                    >
                      <img
                        width={100}
                        src={require('../../../assets/img/png_icon_apple.png')}
                        alt="gplay"
                      />
                    </a>
                  </div>
                  <li>Scan this Barcode</li>
                  <div className="storeBtnWrapper" />
                  <li>Enter Verification Code</li>
                  <div className="inputWrapper">
                    <TextField
                      error={this.state.tokenInputError}
                      id="token"
                      label="Code"
                      helperText={
                        this.state.tokenInputError ? 'Code do not match!' : ' '
                      }
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
                      VERIFY <DoneAll className="rightIcon" />
                    </Button>
                  </div>
                </ol>
              </div>
            </div>
            <div className="modalFooterWrapper">
              <span className="secretWarning">
                This is your secret key, copy and keep it safe
              </span>
              {this.state.gAuthSecret}
            </div>
          </div>
        </Modal>
        <Grid item md={12} xs={12} className="userTwoFactor">
          <div className="statusWrapper">
            <div className="statusTextSpan">
              Google
              <br />
              Authenticator:
            </div>
            {this.props.app.twoFA.auth && (
              <div className="statusEnable"> Enabled </div>
            )}
            {!this.props.app.twoFA.auth && (
              <div className="statusDisable">
                {' '}
                Not Enabled <br />
                <span className="lowSecuritySpan">(Low Security)</span>
              </div>
            )}
          </div>
        </Grid>
        {/* <div className="reCapthaWraper" ref={ref => (this.recaptcha = ref)} /> */}
        <Grid
          container
          direction="row"
          justify="space-between"
          className="twoFactorBtnGrid"
        >
          <Grid item>
            <Button
              id="removeSecret"
              className={`twoFactorBtn ${
                app.twoFA.authSecret ? 'active' : 'disabled'
              }`}
              style={{ marginBottom: '15px' }}
            >
              Remove Secret
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="disable2FAAuth"
              className={`twoFactorBtn active ${
                this.props.app.twoFA.auth ? 'show' : 'hide'
              }`}
            >
              Disable 2FA Auth
            </Button>
            <Button
              id="enable2FAAuth"
              className={`twoFactorBtn active ${
                !this.props.app.twoFA.auth ? 'show' : 'hide'
              }`}
            >
              Enable 2FA Auth
            </Button>
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
    set2FA: auth => dispatch(actions.set2FA(auth))
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(userTwoFactorAuthStyle)
)(UserTwoFactorAuth);
