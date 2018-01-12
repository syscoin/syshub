import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
// import style
import { login } from "./styles";
class Login extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div style={login.mainContainer}>
        <h1>Login to SysHub</h1>
        <div style={login.formDiv}>
          <form style={login.form}>
            <div style={login.inputDiv}>
              <label style={login.label} htmlFor="uName">Username:</label>
              <input type="text" name="username" id="uName" style={login.input} placeholder="Username" />
            </div>
            <br />
            <div style={login.inputDiv}>
              {/* <span style={login.label}>Password: </span> */}
              <label style={login.label} htmlFor="pass">Password:</label>
              <input type="password" name="password" id="pass" style={login.input} placeholder="********" />
            </div>
            <br />
            <div style={login.btnDiv}>
              <Button raised color="primary" style={login.btn}>
                <span style={login.btnText}> Login </span>
              </Button>
              <a style={login.forgetLink}>Forget your Password? </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


export default Login;
