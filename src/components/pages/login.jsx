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
              <span style={login.label}>Username: </span>
              <input type="text" name="username" style={login.input} />
            </div>
            <br />
            <div style={login.inputDiv}>
              <span style={login.label}>Password: </span>
              <input type="password" name="password" style={login.input} />
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
