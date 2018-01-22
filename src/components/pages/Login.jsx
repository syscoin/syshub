import React, { Component } from 'react';
import { Button, Grid, FormGroup, Input, withStyles } from 'material-ui';
import Recaptcha from 'react-recaptcha';

import { doLogin } from '../../firebase';

// import style
import { loginStyle } from './styles';

class Login extends Component {
  // specifying your onload callback function
  callback() {
    console.log('Recaptcha onLoad CallBack: Done!!!!');
  }

  // specifying verify callback function
  verifyCallback(response) {
    console.log('Recaptcha Verify CallBack: ', response);
  }
  login(event) {
    event.preventDefault();
    const email = this.loginEmail.value;
    const password = this.loginPsw.value;
    doLogin(email, password);
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
            <Grid
              item
              lg={{ size: 8, offset: 2 }}
              md={{ size: 10, offset: 1 }}
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
                <div className="recaptcha">
                  <Recaptcha
                    style={{ marginLeft: '10px' }}
                    id="captcha"
                    sitekey="6LeNoEAUAAAAADaWqXweDPiSR-8HnWCQ3ZMrNp1o"
                    render="explicit"
                    verifyCallback={() => this.verifyCallback}
                    onloadCallback={() => this.callback}
                  />
                </div>
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

export default withStyles(loginStyle)(Login);
