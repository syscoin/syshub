import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userTwoFactorStyle } from './styles';
import { Button, Grid, FormGroup, Input } from 'material-ui';
import { fire, phoneAuth } from '../../API/firebase';
import { phoneValidation } from '../../Helpers';
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
      isoCode: null,
      editNumber: false
    };

    this.addPhone = this.addPhone.bind(this);
    this.disableAuth = this.disableAuth.bind(this);
    this.enableAuth = this.enableAuth.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editPhone = this.editPhone.bind(this);
    this.removePhone = this.removePhone.bind(this);
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

  removePhone() {
    const user = fire.auth().currentUser;
    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Please register/login',
        icon: 'error'
      });
      return;
    }

    user
      .unlink(fire.auth.PhoneAuthProvider.PROVIDER_ID)
      .then(data => {
        console.log(data);
        alert('success');
      })
      .catch(err => {
        alert(`${err}`);
      });
  }

  editPhone() {
    const user = fire.auth().currentUser;
    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Please register/login',
        icon: 'error'
      });
      return;
    }

    this.setState({
      editNumber: true
    });
  }

  addPhone() {
    const user = fire.auth().currentUser;

    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Please register/login',
        icon: 'error'
      });
      return;
    }
    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    if (phoneValidation(this.state.phoneNumber, this.state.isoCode, user) === false) {
      return;
    }

    this.setState({ isoCode: '', phoneNumber: '' });

    const userNumber = phoneValidation(this.state.phoneNumber, this.state.isoCode, user);

    const appVerifier = window.recaptchaVerifier;
    const provider = new fire.auth.PhoneAuthProvider();

    phoneAuth(user, provider, phoneUtil.format(userNumber, PNF.E164), appVerifier);
  }

  enableAuth() {
    const user = fire.auth().currentUser;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    if (user.phoneNumber == null) {
      this.addPhone();
    }

    fire
      .database()
      .ref('2FA/' + user.uid)
      .set(true);
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
    const { classes, deviceType, app } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const avatar = require('../../assets/img/no-user-image.gif');
    const checkIcon = require('../../assets/img/check.png');
    const closeIcon = require('../../assets/img/close.png');
    const appStore = require('../../assets/img/png_icon_apple.png');
    const windowsStore = require('../../assets/img/png_icon_windows.png');
    const playStore = require('../../assets/img/png_icon_google.png');
    const { currentUser } = this.props.app;
    console.log(currentUser);

    return (
      <div className={style}>
        <Grid container>
          {/* change password text */}
          <Grid md={12} className="heading-grid">
            <h1 className="userTwoFactor-heading">2-Factor-Authentication</h1>
          </Grid>
          {app.currentUser ? (
            app.currentUser.phoneNumber == null || this.state.editNumber ? (
              <Grid item md={12} className="form__container">
                <form
                  ref={form => {
                    this.addPhoneForm = form;
                  }}
                  className="wrapper"
                >
                  <Grid
                    item
                    lg={{ size: 8, offset: 2 }}
                    md={{ size: 10, offset: 1 }}
                    justify="center"
                  >
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
                {app.currentUser ? (
                  app.currentUser.phoneNumber !== null ? (
                    <button onClick={this.removePhone}>Delete</button>
                  ) : null
                ) : null}
                <button onClick={this.addPhone}>Add</button>
              </Grid>
            ) : (
              <div>
                <button onClick={this.editPhone}>Edit</button>
              </div>
            )
          ) : null}

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
                <Button
                  raised
                  color="primary"
                  className="twoFactor-button"
                  onClick={this.enableAuth}
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
