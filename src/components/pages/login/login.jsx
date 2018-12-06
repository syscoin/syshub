import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import swal from 'sweetalert';

// Import Services
import { fire } from '../../../API/firebase';
import { getFire2FAstatus } from '../../../API/twoFAFirebase.service';
import { loginWithPhone } from '../../../API/twoFAPhone.service';

// Import Material-ui components
import { Button, Grid, FormGroup } from '@material-ui/core';

// import style
import injectSheet from 'react-jss';
import loginStyle from './login.style';

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.smsLogin = this.smsLogin.bind(this);
    this.authLogin = this.authLogin.bind(this);
    this.passwordRecovery = this.passwordRecovery.bind(this);
  }

  componentDidMount() {
    fire.auth().useDeviceLanguage();

    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha, {
      callback: response => {
        this.verify = response;
      }
    });

    window.recaptchaVerifier.render()
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
          return fire.auth().sendPasswordResetEmail(emailInput);
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

  async authLogin(user){
    console.log('ACZ user -->', user); // don't remove by now
    alert('Hello, you have the Authenticator enabled');
    return;
  }

  async smsLogin(user, email, password) {
    const appVerifier = window.recaptchaVerifier;
    await fire.auth().signOut();
    this.props.setCurrentUser(null);
    const confirmationResult = await loginWithPhone(`${user.phoneNumber}`, appVerifier);
    if (confirmationResult) {
      const swalValue = await swal({
                                closeOnClickOutside: false,
                                closeOnEsc: false,
                                title: 'Two-Factor Phone Authentication',
                                text: 'Please provide the verification code sent to your phone',
                                icon: "warning",
                                buttons: true,
                                dangerMode: false,
                                content: {
                                  element: 'input',
                                  attributes: {
                                    placeholder: 'Confirmation code here',
                                    type: 'text'
                                  }
                                }
                              });
      const verifiedToken = await confirmationResult.confirm(swalValue);
      return verifiedToken;
    } 
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
      window.recaptchaVerifier.reset()
      return;
    }

    fire.auth().signInWithEmailAndPassword(email, password).then(async user => {
      const { twoFA, sms, auth } = await getFire2FAstatus(user.uid);
      if (twoFA) {
        if(auth) { 
          await this.authLogin(user);
        }
        if(sms && user.phoneNumber) { 
          await this.smsLogin(user, email, password);
        }
        this.props.setPage('home');
        swal({
          title: 'Success',
          text: `${user.displayName}, you are successfuly signed in`,
          icon: 'success'
        });
      } else {
        swal({
          title: 'Success',
          text: `${user.displayName} signed in without sms verification.`,
          icon: 'success'
        });
        this.loginForm.reset();
        this.props.setPage('home');
      }
    })
    .catch(err => {
      fire.auth().signOut();
      this.props.setCurrentUser(null);
      this.loginForm.reset();
      this.verify = undefined;
      window.recaptchaVerifier.reset();
      swal({
        title: 'Oops...',
        text: `${err}`,
        icon: 'error'
      });
    });
  }

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid item className={style} md={12} xs={12}>
        <h1 className="title">Login to SysHub</h1>
        <Grid item md={12} xs={12} className="form__container">
          <form
            onSubmit={event => this.login(event)}
            ref={form => { this.loginForm = form }}
            className="form__wrapper">
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
                <div ref={ref => (this.recaptcha = ref)} className="recaptcha" />
              </FormGroup>

              {/* Form Action Button */}
              <FormGroup className="form-group form-button-group">
                <Button type="submit" color="primary">
                  Login
                </Button>
                <br />
                <a onClick={this.passwordRecovery}>Forget Your Password?</a>
                <br />
                Don’t have an account?{' '}
                <a onClick={() => this.props.setPage('register')} className="signUpTxt">
                  Sign Up
                </a>
              </FormGroup>
            </Grid>
          </form>
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
    setPage: page => dispatch(actions.setPage(page)),
    setCurrentUser: user => dispatch(actions.setCurrentUser(user))
  };
};

export default connect(stateToProps, dispatchToProps)(injectSheet(loginStyle)(Login));
