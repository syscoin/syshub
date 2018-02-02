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

  login(event) {
    event.preventDefault();
    const email = this.loginEmail.value;
    const password = this.loginPsw.value;
    const appVerifier = window.recaptchaVerifier;
    const mnPrivateKeys = [
      {
        mnPrivateKey: '92YPhw71K9MgH22EHQMWKmfyeyUn5dBaHkYJK59GfSaoikzpBPe',
        vinMasternode: '6d85fc329e378410fd838de2d3b3f737d37bb09b59a4e7acc3bc1c0fa6f838d8-0'
      },
      {
        mnPrivateKey: '91e25Yfw2MRZka8pqsLA73C7nGzzcFRYewdpdgB397TiCSgAwUR',
        vinMasternode: '4846fd20a1e97c44beaa4ab427ebec9d60741954006c35f8b9a959100755fe7f-0'
      },
      {
        mnPrivateKey: '93UimiJFDQTTLsyPeu8BRN9EdzKHJJ3Y2kcxc33oBU4yiRy7FYQ',
        vinMasternode: '4846fd20a1e97c44beaa4ab427ebec9d60741954006c35f8b9a959100755fe7f-0'
      },
      {
        mnPrivateKey: '92LhW3cNd8VZmsHhgsaKX8GUeSArnJP5MNt4SLpsDX3uB1Gb983',
        vinMasternode: '4683812d19ca7035c551301b55e7bf9ab6fb80fc045fa92649333d4a00683224-0'
      }
    ];

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
        } else {
          fire
            .database()
            .ref('mnPrivateKey/' + user.uid)
            .set(mnPrivateKeys);
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

              fire
                .database()
                .ref('mnPrivateKey/' + user.uid)
                .set(mnPrivateKeys);

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
      { classes } = this.props;

    return (
      <Grid container className={classes.root} md={12}>
        <h1 className="title">Login to SysHub</h1>
        <Grid item md={12} className="form__container">
          <form
            onSubmit={event => this.login(event)}
            ref={form => {
              this.loginForm = form;
            }}
            className="wrapper"
          >
            <Grid item lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} justify="center">
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
                <div ref={ref => (this.recaptcha = ref)} />
              </FormGroup>

              {/* Form Action Button */}
              <FormGroup className="form-group form-button-group">
                <Button type="submit" color="primary">
                  Login
                </Button>
                <a>Forget Your Password?</a>
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
    setPage: page => dispatch(actions.setPage(page))
  };
};

export default connect(stateToProps, dispatchToProps)(withStyles(loginStyle)(Login));
