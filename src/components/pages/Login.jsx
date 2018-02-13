import React, { Component } from 'react';
import { Button, Grid, FormGroup, Input, withStyles } from 'material-ui';
import Recaptcha from 'react-recaptcha';
import swal from 'sweetalert';
import { doLogin, fire } from '../../API/firebase';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

// import style
import { loginStyle } from './styles';

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.passwordRecovery = this.passwordRecovery.bind(this);
  }

  componentDidMount() {
    fire.auth().useDeviceLanguage();

    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha, {
      callback: response => {
        this.verify = response;
      }
    });

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
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
        alert(err);
      });
  }

  login(event) {
    event.preventDefault();
    const email = this.loginEmail.value;
    const password = this.loginPsw.value;
    const appVerifier = window.recaptchaVerifier;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'You forgot to complete the reCAPTCHA',
        icon: 'error'
      });

      return;
    }

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (this.props.app.auth) {
          if (user.phoneNumber == null) {
            swal({
              title: 'Oops...',
              text: 'Add phone number to the account first in account settings',
              icon: 'error'
            });
            return;
          }
          return fire.auth().signInWithPhoneNumber(`+${user.phoneNumber}`, appVerifier);
        }
      })
      .then(confirmationResult => {
        if (confirmationResult) {
          swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Success',
            text: 'Please provide use the verification code to continue',
            icon: 'success',
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
            .then(value => {
              return confirmationResult.confirm(value);
            })
            .then(result => {
              return fire.auth().signInWithEmailAndPassword(email, password);
            })
            .then(user => {
              swal({
                title: 'Sucess',
                text: `${user.email} signed in with sms verification`,
                icon: 'success'
              });

              //attach MN to user here
              fire
                .database()
                .ref('MasterNodes/' + user.uid)
                .on('value', snapshot => {
                  let list = [];
                  snapshot.forEach(snap => {
                    list.push(snap.val());
                  });

                  user.MasterNodes = list;
                  this.props.setCurrentUser(user);
                });

              this.props.setPage('home');
            })
            .catch(err => {
              swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
            });

          return;
        }
        swal({
          title: 'Success',
          text: `Account logged in.`,
          icon: 'success'
        });

        this.props.setPage('home');
      })
      .catch(err => {
        swal({
          title: 'Oops...',
          text: `${err}`,
          icon: 'error'
        });
      });
  }

  render() {
    const captcha = require('../../assets/img/captcha.jpg'),
      checkIcon = require('../../assets/img/checkIcon.png'),
      { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    return (
      <Grid container className={style} md={12} xs={12}>
        <h1 className="title">Login to SysHub</h1>
        <Grid item md={12} xs={12} className="form__container">
          <form
            onSubmit={event => this.login(event)}
            ref={form => {
              this.loginForm = form;
            }}
            className="wrapper"
          >
            <Grid
              item
              lg={{ size: 8, offset: 2 }}
              md={{ size: 10, offset: 1 }}
              xs={12}
              justify="center"
            >
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
                <div ref={ref => (this.recaptcha = ref)} className="recaptcha-div" />
              </FormGroup>

              {/* Form Action Button */}
              <FormGroup className="form-group form-button-group">
                <Button type="submit" color="primary">
                  Login
                </Button>
                <a onClick={this.passwordRecovery}>Forget Your Password?</a>
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

export default connect(stateToProps, dispatchToProps)(withStyles(loginStyle)(Login));
