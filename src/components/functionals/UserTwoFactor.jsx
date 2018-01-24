import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userTwoFactorStyle } from './styles';
import { Button, Grid, FormGroup, Input } from 'material-ui';
import { fire } from '../../firebase';
import swal from 'sweetalert';

// import components
import { Stats, WelcomeBox } from '../functionals';

import QRCode from 'qrcode.react';
class UserTwoFactor extends Component {
  constructor(props) {
    super(props);

    this.addPhone = this.addPhone.bind(this);
    this.disableAuth = this.disableAuth.bind(this);
  }

  componentDidMount() {
    fire.auth().useDeviceLanguage();
    const user = fire.auth().currentUser;

    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha, {
      callback: response => {
        this.verify = response;
      },
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

  addPhone() {
    const user = fire.auth().currentUser;
    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error',
      });
      return;
    }

    if (user.phoneNumber != null) {
      fire
        .database()
        .ref('2FA/' + user.uid)
        .set(true);

      return;
    }

    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      title: '1 - Add Phone Number',
      text: 'Please include your country code as well as area code as well.',
      icon: 'info',
      buttons: true,
      dangerMode: true,
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Provide Phone Number',
          type: 'number',
        },
      },
    }).then(value => {
      if (value) {
        const appVerifier = window.recaptchaVerifier;
        const provider = new fire.auth.PhoneAuthProvider();
        provider
          .verifyPhoneNumber(`+${value}`, appVerifier)
          .then(verificationId => {
            swal({
              closeOnClickOutside: false,
              closeOnEsc: false,
              title: '2 - Verify',
              text:
                'Please enter the verification code sent to your mobile device',
              icon: 'info',
              buttons: true,
              dangerMode: false,
              content: {
                element: 'input',
                attributes: {
                  placeholder: 'Confirmation code here',
                  type: 'text',
                },
              },
            })
              .then(verificationCode => {
                return fire.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
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
                  icon: 'success',
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
    });
  }

  disableAuth() {
    const user = fire.auth().currentUser;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error',
      });
      return;
    }

    fire
      .database()
      .ref('2FA/' + user.uid)
      .set(false);
  }

  render() {
    const { classes } = this.props;
    const avatar = require('../../assets/img/no-user-image.gif');
    const checkIcon = require('../../assets/img/check.png');
    const closeIcon = require('../../assets/img/close.png');
    const appStore = require('../../assets/img/png_icon_apple.png');
    const windowsStore = require('../../assets/img/png_icon_windows.png');
    const playStore = require('../../assets/img/png_icon_google.png');

    const { currentUser } = this.props.app;
    console.log(this.props.app.auth);

    return (
      <div className={classes.root}>
        <Grid container>
          {/* change password text */}
          <Grid md={12}>
            <h1 className="userTwoFactor-heading">2-Factor-Authentication</h1>
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
              <div
                className="reCapthaWraper"
                ref={ref => (this.recaptcha = ref)}
              />
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
                <Button
                  raised
                  color="primary"
                  className="twoFactor-button"
                  onClick={this.addPhone}
                >
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
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    setAuth: value => dispatch(actions.setAuth(value)),
  };
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(userTwoFactorStyle)(UserTwoFactor)
);
