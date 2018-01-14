import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Recaptcha from 'react-recaptcha';
import Icon from 'material-ui/Icon';
import useSheet from 'react-jss';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import RegisterTest from './RegisterTest';
// import withRoot from '../containers/WithRoot';

// import style
import { register } from './styles';

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
    console.log('---------------------------');
    console.log('---------------------------');
    //console.log(classes);
    console.log('---------------------------');
    console.log('---------------------------');
    console.log('---------------------------');
    return (
      <div style={register.mainContainer}>
        <h1 style={register.mainheading}>Join SysHub</h1>
        <div style={register.formDiv}>
          <form style={register.form}>
            <div style={register.inputDivUsername}>
              <label style={register.label} htmlFor="uName">
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="uName"
                style={register.input}
                placeholder="Username"
              />
              <span>
                <img src={checkIcon} style={register.checkIcon} /> Username
                Available
              </span>
            </div>
            <br />
            <div style={register.inputDivPassword}>
              <label style={register.label} htmlFor="pass">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="pass"
                style={register.input}
                placeholder="********"
              />
              <span>
                <img src={checkIcon} style={register.checkIcon} />Password
                Strength :<span style={register.passwordStrength}>Strong</span>
              </span>
            </div>
            <br />
            <div style={register.inputDivConfirmPassword}>
              <label style={register.label} htmlFor="pass">
                Confirm Password:
              </label>
              <input
                type="password"
                name="password"
                id="pass"
                style={register.confirmPasswordinput}
                placeholder="********"
              />
            </div>
            <br />
            <div className={classes.captchaWrapper}>
              <label style={register.label} htmlFor="captcha">
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
            <div style={register.termsDiv}>
              I have read and accepted the{' '}
              <span style={register.activeTermsText}>Terms and service</span>
            </div>

            <div style={register.btnDiv}>
              <Button raised color="primary" style={register.registerBtn}>
                <span style={register.btnText}> register </span>
              </Button>
              <Button raised color="primary" style={register.registerLoginBtn}>
                <span style={register.btnText}> register and login </span>
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
export default withStyles(register)(Register);
