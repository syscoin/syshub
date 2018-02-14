import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userTwoFactorStyle } from './styles';
import { Button, Grid, FormGroup, Input } from 'material-ui';
import { fire } from '../../API/firebase';
import swal from 'sweetalert';

// import components
import { Stats, WelcomeBox } from '../functionals';
import QRCode from 'qrcode.react';

import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

const PNF = PhoneNumberFormat;
const phoneUtil = PhoneNumberUtil.getInstance();

class UserTwoFactor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: null,
      isoCode: null
    };
    this.addPhone = this.addPhone.bind(this);
    this.disableAuth = this.disableAuth.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    fire.auth().useDeviceLanguage();
    const user = fire.auth().currentUser;

    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha, {
      callback: response => {
        this.verify = response;
      }
    });

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

    fire
      .database()
      .ref('2FA/' + user.uid)
      .on('value', snap => {
        this.props.setAuth(snap.val());
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addPhone() {
    const user = fire.auth().currentUser;
    if (this.state.phoneNumber == null || this.state.isoCode == null) {
      swal({
        title: 'Oops...',
        text: 'Please include both a phone number and country code.',
        icon: 'error'
      });
      return;
    }

    let userNumber = null;

    try {
      userNumber = phoneUtil.parseAndKeepRawInput(
        this.state.phoneNumber,
        this.state.isoCode.toUpperCase()
      );
    } catch (e) {
      swal({
        title: 'Oops...',
        text: `${e}`,
        icon: 'error'
      });
      return;
    }

    if (userNumber == null) {
      swal({
        title: 'Oops...',
        text: 'Please add a phone number and country code.',
        icon: 'error'
      });

      return;
    }

    if (!phoneUtil.isValidNumber(userNumber)) {
      swal({
        title: 'Oops...',
        text:
          'Invalid format for phone number, please make sure you have given the correct area code in front of your phone number and have given the correct country code.',
        icon: 'error'
      });
    }
    return;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    if (user.phoneNumber == phoneUtil.format(userNumber, PNF.E164)) {
      swal({
        title: 'Oops...',
        text: 'This phone number is already attached to this account.',
        icon: 'error'
      });

      fire
        .database()
        .ref('2FA/' + user.uid)
        .set(true);

      return;
    }

    const appVerifier = window.recaptchaVerifier;
    const provider = new fire.auth.PhoneAuthProvider();

    provider
      .verifyPhoneNumber(phoneUtil.format(userNumber, PNF.E164), appVerifier)
      .then(verificationId => {
        swal({
          closeOnClickOutside: false,
          closeOnEsc: false,
          title: 'Verify',
          text: 'Please enter the verification code sent to your mobile device',
          icon: 'info',
          buttons: true,
          dangerMode: false,
          content: {
            element: 'input',
            attributes: {
              placeholder: 'Confirmation code here',
              type: 'text'
            }
          }
        })
          .then(verificationCode => {
            return fire.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
          })
          .then(phoneCredential => {
            return user.updatePhoneNumber(phoneCredential);
          })
          .then(() => {
            fire
              .database()
              .ref('2FA/' + user.uid)
              .set(true);
            swal({
              title: 'Sucess',
              text: `Two Factor Authentication Enabled`,
              icon: 'success'
            });
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        console.log('err) --> ', err);

        alert(`${err}`);
      });
  }

  disableAuth() {
    const user = fire.auth().currentUser;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    fire
      .database()
      .ref('2FA/' + user.uid)
      .set(false);
  }

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const avatar = require('../../assets/img/no-user-image.gif');
    const checkIcon = require('../../assets/img/check.png');
    const closeIcon = require('../../assets/img/close.png');
    const appStore = require('../../assets/img/png_icon_apple.png');
    const windowsStore = require('../../assets/img/png_icon_windows.png');
    const playStore = require('../../assets/img/png_icon_google.png');
    const { currentUser } = this.props.app;

    return (
      <div className={style}>
        <Grid container>
          {/* change password text */}
          <Grid md={12} className="heading-grid">
            <h1 className="userTwoFactor-heading">2-Factor-Authentication</h1>
          </Grid>
          <Grid item md={12} className="form__container">
            <form
              ref={form => {
                this.addNodeForm = form;
              }}
              className="wrapper"
            >
              <Grid item lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} justify="center">
                <FormGroup className="form-group">
                  <span htmlFor="user-name" className="label">
                    {`Phone Number (With Area Code): `}
                  </span>
                  <input
                    ref={phoneNumber => (this.phoneNumber = phoneNumber)}
                    id="phoneNumber"
                    name="phoneNumber"
                    className="input-field"
                    placeholder="Phone Number"
                    value={this.state.phoneNumber}
                    onChange={this.onChange}
                    type="number"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <span htmlFor="user-name" className="label">
                    {`Country Code (Example - US, ES): `}
                  </span>
                  <input
                    ref={isoCode => (this.isoCode = isoCode)}
                    id="isoCode"
                    name="isoCode"
                    className="input-field"
                    placeholder="US"
                    value={this.state.isoCode}
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Grid>
            </form>
          </Grid>
          {/* userTwofactor left grid */}
          <Grid md={6} className="userTwoFactor-left-grid">
            <span className="enable2FA-note">
              Note: Enabling 2FA to secure your account is recommended
            </span>
            <div className="div-margin">
              <span className="statusText-span">Status:</span>
              <span>
                {this.props.app.auth ? (
                  <span className="status-enable">Enable</span>
                ) : (
                  <span className="status-disable">
                    Disabled
                    <span className="lowSecurity-span">(Low Security)</span>
                  </span>
                )}
              </span>
              <div className="reCapthaWraper" ref={ref => (this.recaptcha = ref)} />
            </div>
            <Grid className="twoFactor-button-grid">
              {this.props.app.auth ? (
                <Button
                  raised
                  color="primary"
                  className="twoFactor-button"
                  onClick={this.disableAuth}
                >
                  Disable 2F Auth
                </Button>
              ) : (
                <Button raised color="primary" className="twoFactor-button" onClick={this.addPhone}>
                  Enable 2F Auth
                </Button>
              )}
            </Grid>
          </Grid>
          {/* userTwofactor right grid */}
        </Grid>
      </div>
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
    setAuth: value => dispatch(actions.setAuth(value))
  };
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(userTwoFactorStyle)(UserTwoFactor)
);
