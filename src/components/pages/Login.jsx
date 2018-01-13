import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Recaptcha from 'react-recaptcha';

import LoginTest from './LoginTest';
// import style
import { loginStyle } from './styles';
class Login extends Component {
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
    const captcha = require('../../assets/img/captcha.jpg');
    return (
      <div style={loginStyle.mainContainer}>
        <h1 style={loginStyle.mainheading}>Login to SysHub</h1>
        <div style={loginStyle.formDiv}>
          <form style={loginStyle.form}>
            <div style={loginStyle.inputDiv}>
              <label style={loginStyle.label} htmlFor="uName">
                Username:
              </label>
              <input
                type="text"
                name="username"
                id="uName"
                style={loginStyle.input}
                placeholder="Username"
              />
            </div>
            <br />
            <div style={loginStyle.inputDiv}>
              {/* <span style={login.label}>Password: </span> */}
              <label style={loginStyle.label} htmlFor="pass">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="pass"
                style={loginStyle.input}
                placeholder="********"
              />
            </div>
            <br />
            <div style={loginStyle.captcha}>
              <label style={loginStyle.label} htmlFor="captcha">
                Captcha:
              </label>
              <img src={captcha} style={loginStyle.captchaImg} />
              {/* <Recaptcha
               id="captcha"
                      sitekey="xxxxxxxxxxxxxxxxxxxx"
                      render="explicit"
                      verifyCallback={this.verifyCallback.bind(this)}
                      onloadCallback={this.callback.bind(this)}
                    /> */}
            </div>

            <div style={loginStyle.btnDiv}>
              <Button raised color="primary" style={loginStyle.btn}>
                <span style={loginStyle.btnText}> Login </span>
              </Button>
              <a style={loginStyle.forgetLink}>Forget your Password? </a>
            </div>
          </form>
          <LoginTest />
        </div>
      </div>
    );
  }
}

export default Login;
