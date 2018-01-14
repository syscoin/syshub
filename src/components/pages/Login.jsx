import React, { Component } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  FormLabel,
  FormGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  Input,
  Checkbox,
  withStyles
} from 'material-ui';
import Recaptcha from 'react-recaptcha';
import LoginTest from './LoginTest';

// import style
import { loginStyle } from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  // specifying your onload callback function
  callback = function () {
    console.log('Done!!!!');
  };

  // specifying verify callback function
  verifyCallback = function (response) {
    console.log(response);
  };

  render() {
    const captcha = require('../../assets/img/captcha.jpg'),
      checkIcon = require('../../assets/img/checkIcon.png'),
      { classes } = this.props;

    return (
      <Grid container className={classes.root} md={12}>
        <h1 className='title'>Login to SysHub</h1>
        <Grid item md={12} className='form__container'>
            <form className="wrapper">
              <Grid item lg={{size: 8, offset:2}} md={{size: 10, offset: 1}} justify='center'>
                
                {/* For User Name */}
                <FormGroup className='form-group'>
                  <span htmlFor="user-name" className="label">Username: </span>
                  <Input 
                    id="user-name" 
                    className="input-field"
                    placeholder="Enter Username" />
                  <span className="validation-message">
                    <img src={checkIcon}/>
                    Username Available
                  </span>
                </FormGroup>
                
                {/* For Password */}
                <FormGroup className='form-group'>
                  <span htmlFor="password" className="label">Password: </span>
                  <Input 
                    type="password" 
                    id="password" 
                    className="input-field"
                    placeholder="**************" />
                  <span className="validation-message">
                    <img src={checkIcon}/>
                    Password Strength
                    <span className="strong">Strong</span>
                  </span>
                </FormGroup>
                
                {/* For Confirm Password */}
                <FormGroup className='form-group'>
                  <span htmlFor="confirm-password" className="label">Confirm Password: </span>
                  <Input 
                    type="password" 
                    id="confirm-password" 
                    className="input-field" 
                    placeholder="**************" />
                  {/* <span className="validation-message">
                    <img src={checkIcon}/>
                    Username Available
                  </span> */}
                </FormGroup>

                {/* For Confirm Password */}
                <FormGroup className='form-group'>
                  <span htmlFor="confirm-password" className="label">Confirm Password: </span>
                  <div className="recaptcha">
                    <Recaptcha
                      style={{marginLeft: '10px'}}
                      id="captcha"
                      sitekey="6LeNoEAUAAAAADaWqXweDPiSR-8HnWCQ3ZMrNp1o"
                      render="explicit"
                      verifyCallback={this.verifyCallback.bind(this)}
                      onloadCallback={this.callback.bind(this)}
                    />
                  </div> 
                </FormGroup>
                
                {/* Terms and Service */}
                <FormGroup className='form-group terms-of-condition'>
                  <p>I have read and accepted the <a href='#'>Terms of Service</a></p>
                </FormGroup>
                
                {/* Form Action Button */}
                <FormGroup className='form-group form-button-group'>
                  <Button color="primary" className={classes.button}>
                    Primary
                  </Button>
                  <Button color="accent" className={classes.button}>
                    Accent
                  </Button> 
                </FormGroup>
              </Grid>
            </form>
            <LoginTest />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(loginStyle)(Login);
