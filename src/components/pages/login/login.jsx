import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import actions from '../../../redux/actions';
import swal from 'sweetalert';

// Imports helpers
import to from '../../../Helpers/to';
import runTasks from '../../../Helpers/hooks';

//Imports providers HOC's
import { withFirebase } from '../../../providers/firebase';

// Import Services
import { verifyAuthCode } from '../../../API/syscoin/twoFAAuthenticator.service';

// Import Material-ui components
import { Button, Grid, FormGroup } from '@material-ui/core';

// Import custom components
import TwoFactorModalChallenge from '../../functionals/twoFactorModalChallenge/twoFactorModalChallenge';

// import style
import injectSheet from 'react-jss';
import loginStyle from './login.style';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      twoFAStatus: {}
    };
    this.login = this.login.bind(this);
    this.passwordRecovery = this.passwordRecovery.bind(this);
  }

  // add Firebase as global var in component
  firebase = this.props.firebase;

  componentDidMount() {
    this.firebase.useDeviceLanguage();

    window.recaptchaVerifier = this.firebase.newRecaptchaVerifier(
      this.recaptcha,
      {
        callback: response => {
          this.verify = response;
        }
      }
    );

    window.recaptchaVerifier.render();
  }

  passwordRecovery() {
    swal({
      title: 'Password Recovery',
      text:
        'Please provide your email that you used for this account. You will be sent an email with instructions for recovering your password.',
      icon: 'info',
      buttons: true,
      danger: false,
      content: {
        element: 'input',
        attributes: {
          placeholder: 'Type your email',
          type: 'email'
        }
      }
    })
      .then(emailInput => {
        if (emailInput) {
          return this.firebase.doPasswordReset(emailInput);
        } else {
          swal({
            title: 'No email was given.',
            text: 'Please put an email in the input field.',
            icon: 'error'
          });
        }
      })
      .then(() => {
        swal({
          title: 'Success',
          text: 'An email has been sent.',
          icon: 'success'
        });
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  async twoFALogin(verifiationResutlObj) {
    const { smsCode, gToken } = verifiationResutlObj;
    const twoFAStatus = this.state.twoFAStatus;
    let vSmsCode = false;
    let vGToken = false;
    let twoFaResult = false;

    if (twoFAStatus.auth) {
      const secret = this.state.secret;
      const email = this.loginEmail.value;
      const password = this.loginPsw.value;
      vGToken = verifyAuthCode(secret, gToken);
      if (vGToken) {
        const user = await this.firebase.doSignInWithEmailAndPassword(
          email,
          password
        );
        twoFaResult = !!user;
      }
    }
    if (twoFAStatus.sms) {
      const confirmationResult = this.state.phoneConfirmationResult;
      try {
        const verifiedCode = await confirmationResult.confirm(smsCode);
        vSmsCode = !!verifiedCode;
      } catch (err) {
        vSmsCode = false;
      }
      twoFaResult = vSmsCode ? vSmsCode : twoFaResult;
    }

    if (twoFAStatus.auth && twoFAStatus.sms) {
      twoFaResult = !!(vSmsCode * vGToken);
    }
    runTasks('onLoginSuccess');

    this.props.setPage('home');
    if (!twoFaResult) {
      await this.firebase.doLogout(() => this.props.doAppLogout());
      swal({
        title: 'Oops...',
        text: 'You do not pass the 2FA Challenge',
        icon: 'error'
      });
      return;
    }
    swal({
      title: 'Success',
      text: `You are successfuly signed in`,
      icon: 'success'
    });
  }

  async login(event) {
    event.preventDefault();

    const email = this.loginEmail.value;
    const password = this.loginPsw.value;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'You forgot to complete the reCAPTCHA',
        icon: 'error'
      });
      window.recaptchaVerifier.reset();
      this.loginForm.reset();
      return;
    }
    const [err, user] = await to(
      this.firebase.doSignInWithEmailAndPassword(email, password)
    );
    if (err) {
      await this.firebase.doLogout(() => this.props.setCurrentUser(null));
      this.loginForm.reset();
      this.verify = undefined;
      window.recaptchaVerifier.reset();
      swal({
        title: 'Oops...',
        text: `${err}`,
        icon: 'error'
      });
    }
    if (user) {
      const appVerifier = window.recaptchaVerifier;
      const twoFAStatus = await this.firebase.getFire2FAstatus(user.uid);
      const showModal = twoFAStatus.twoFA;
      let phoneConfirmationResult, secret;

      if (showModal) {
        if (user.phoneNumber && twoFAStatus.sms) {
          phoneConfirmationResult = await this.firebase.loginWithPhone(
            `${user.phoneNumber}`,
            appVerifier
          );
        }
        if (twoFAStatus.auth && twoFAStatus.authSecret) {
          secret = await this.firebase.getAuthSecret(user.uid);
        }
        await this.firebase.doLogout();
        this.setState({
          showModal,
          twoFAStatus,
          user,
          phoneConfirmationResult,
          secret
        });
      } else {
        swal({
          title: 'Success',
          text: `${user.displayName} signed in without 2FA verification.`,
          icon: 'success'
        });
        this.loginForm.reset();
        runTasks('onLoginSuccess');
        this.props.setPage('home');
      }
    }
  }

  async onModalClose(showModal) {
    const { doAppLogout } = this.props;
    this.setState({ showModal });
    await this.firebase.doLogout();
    doAppLogout();
  }

  render() {
    const { classes, deviceType } = this.props;
    const { twoFAStatus, showModal, tempUser } = this.state;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <div>
        <TwoFactorModalChallenge
          deviceType={deviceType}
          twoFAStatus={twoFAStatus}
          showModal={showModal}
          user={tempUser}
          phoneProvider={this.state.provider}
          onClose={showModal => this.onModalClose(showModal)}
          onVerify={verifiationResutlObj =>
            this.twoFALogin(verifiationResutlObj)
          }
        />
        <Grid item className={style} md={12} xs={12}>
          <h1 className="title">Login to SysHub</h1>
          <Grid item md={12} xs={12} className="form__container">
            <form
              onSubmit={event => this.login(event)}
              ref={form => (this.loginForm = form)}
              className="form__wrapper"
            >
              <Grid item lg={12} md={12} xs={12}>
                {/* For User Name */}
                <FormGroup className="form-group">
                  <span htmlFor="user-name" className="label">
                    {`Email: `}
                  </span>
                  <input
                    ref={email => (this.loginEmail = email)}
                    id="user-email"
                    className="input-field"
                    placeholder="Enter email"
                  />
                </FormGroup>

                {/* For Password */}
                <FormGroup className="form-group">
                  <span htmlFor="password" className="label">
                    {`Password: `}
                  </span>
                  <input
                    ref={pass => (this.loginPsw = pass)}
                    type="password"
                    id="password"
                    className="input-field"
                    placeholder="**************"
                  />
                </FormGroup>

                {/* For Confirm Password */}
                <FormGroup className="form-group">
                  <span htmlFor="confirm-password" className="label">
                    {`Captcha: `}
                  </span>
                  <div
                    ref={ref => (this.recaptcha = ref)}
                    className="recaptcha"
                  />
                </FormGroup>

                {/* Form Action Button */}
                <FormGroup className="form-group form-button-group">
                  <Button type="submit" color="primary">
                    Login
                  </Button>
                  <br />
                  <div
                    className="login_linkLike"
                    onClick={this.passwordRecovery}
                  >
                    Forget Your Password?
                  </div>
                  <br />
                  Don’t have an account?{' '}
                  <span
                    onClick={() => this.props.setPage('register')}
                    className="login_linkLike signUpTxt "
                  >
                    Sign Up
                  </span>
                </FormGroup>
              </Grid>
            </form>
          </Grid>
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
    setPage: page => dispatch(actions.setPage(page)),
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    doAppLogout: () => dispatch(actions.doLogout())
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(loginStyle)
)(Login);
