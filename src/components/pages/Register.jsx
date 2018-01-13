import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Recaptcha from 'react-recaptcha';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import RegisterTest from './RegisterTest';
// import withRoot from '../containers/WithRoot';

// import style
import { registerStyle } from './styles';

class Register extends Component {
  constructor(props) {
    super(props);
  }

  // specifying your onload callback function
  callback = function() {
    console.log('Done!!!!');
  };

  // specifying verify callback function
  verifyCallback = function(response) {
    console.log(response);
  };

  render() {
    const checkIcon = require('../../assets/img/checkIcon.png');
    const captcha = require('../../assets/img/captcha.jpg');
    const { classes } = this.props;
    return (
      <div style={registerStyle.mainContainer}>
        <h1 style={registerStyle.mainheading}>Join SysHub</h1>
        <div style={registerStyle.formDiv}>
          <form style={registerStyle.form}>
            <div style={registerStyle.inputDivUsername}>
              <label style={registerStyle.label} htmlFor="uName">
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="uName"
                style={registerStyle.input}
                placeholder="Username"
              />
              <span>
                <img src={checkIcon} style={registerStyle.checkIcon} /> Username
                Available
              </span>
            </div>
            <br />
            <div style={registerStyle.inputDivPassword}>
              <label style={registerStyle.label} htmlFor="pass">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="pass"
                style={registerStyle.input}
                placeholder="********"
              />
              <span>
                <img src={checkIcon} style={registerStyle.checkIcon} />Password
                Strength :<span style={registerStyle.passwordStrength}>Strong</span>
              </span>
            </div>
            <br />
            <div style={registerStyle.inputDivConfirmPassword}>
              <label style={registerStyle.label} htmlFor="pass">
                Confirm Password:
              </label>
              <input
                type="password"
                name="password"
                id="pass"
                style={registerStyle.confirmPasswordinput}
                placeholder="********"
              />
            </div>
            <br />
            <div className={classes.captchaWrapper}>
              <label style={registerStyle.label} htmlFor="captcha">
                Captcha:
              </label>
              {/* <img src={captcha} style={register.captchaImg} /> */}
              <Recaptcha
                id="captcha"
                sitekey="6LcjcUAUAAAAAMffcPuK68DJC5SDyChsMyqJFP_1"
                render="explicit"
                verifyCallback={this.verifyCallback.bind(this)}
                onloadCallback={this.callback.bind(this)}
              />
            </div>
            <br />
            <div style={registerStyle.termsDiv}>
              I have read and accepted the{' '}
              <span style={registerStyle.activeTermsText}>Terms and service</span>
            </div>

            <div style={registerStyle.btnDiv}>
              <Button raised color="primary" style={registerStyle.registerBtn}>
                <span style={registerStyle.btnText}> register </span>
              </Button>
              <Button raised color="primary" style={registerStyle.registerLoginBtn}>
                <span style={registerStyle.btnText}> register and login </span>
              </Button>
            </div>
          </form>
          <RegisterTest />
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(registerStyle)(Register);
