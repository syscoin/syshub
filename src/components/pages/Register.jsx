import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import {
  Button,
  Grid,
  FormGroup,
  Input,
  withStyles
} from 'material-ui';
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
    const captcha = require('../../assets/img/captcha.jpg'),
    checkIcon = require('../../assets/img/checkIcon.png'),
    { classes } = this.props;
    return (
      // <div style={registerStyle.mainContainer}>
      //   <h1 style={registerStyle.mainheading}>Join SysHub</h1>
      //   <div style={registerStyle.formDiv}>
      //     <form style={registerStyle.form}>
      //       <div style={registerStyle.inputDivUsername}>
      //         <label style={registerStyle.label} htmlFor="uName">
      //           Username:
      //         </label>
      //         <input
      //           type="text"
      //           name="username"
      //           id="uName"
      //           style={registerStyle.input}
      //           placeholder="Username"
      //         />
      //         <span>
      //           <img src={checkIcon} style={registerStyle.checkIcon} /> Username
      //           Available
      //         </span>
      //       </div>
      //       <br />
      //       <div style={registerStyle.inputDivPassword}>
      //         <label style={registerStyle.label} htmlFor="pass">
      //           Password:
      //         </label>
      //         <input
      //           type="password"
      //           name="password"
      //           id="pass"
      //           style={registerStyle.input}
      //           placeholder="********"
      //         />
      //         <span>
      //           <img src={checkIcon} style={registerStyle.checkIcon} />Password
      //           Strength :<span style={registerStyle.passwordStrength}>Strong</span>
      //         </span>
      //       </div>
      //       <br />
      //       <div style={registerStyle.inputDivConfirmPassword}>
      //         <label style={registerStyle.label} htmlFor="pass">
      //           Confirm Password:
      //         </label>
      //         <input
      //           type="password"
      //           name="password"
      //           id="pass"
      //           style={registerStyle.confirmPasswordinput}
      //           placeholder="********"
      //         />
      //       </div>
      //       <br />
      //       <div className={classes.captchaWrapper}>
      //         <label style={registerStyle.label} htmlFor="captcha">
      //           Captcha:
      //         </label>
      //         {/* <img src={captcha} style={register.captchaImg} /> */}
      //         <Recaptcha
      //           id="captcha"
      //           sitekey="6LcjcUAUAAAAAMffcPuK68DJC5SDyChsMyqJFP_1"
      //           render="explicit"
      //           verifyCallback={this.verifyCallback.bind(this)}
      //           onloadCallback={this.callback.bind(this)}
      //         />
      //       </div>
      //       <br />
      //       <div style={registerStyle.termsDiv}>
      //         I have read and accepted the{' '}
      //         <span style={registerStyle.activeTermsText}>Terms and service</span>
      //       </div>

      //       <div style={registerStyle.btnDiv}>
      //         <Button raised color="primary" style={registerStyle.registerBtn}>
      //           <span style={registerStyle.btnText}> register </span>
      //         </Button>
      //         <Button raised color="primary" style={registerStyle.registerLoginBtn}>
      //           <span style={registerStyle.btnText}> register and login </span>
      //         </Button>
      //       </div>
      //     </form>
      //     <RegisterTest />
      //   </div>
      // </div>

      <Grid container className={classes.root} md={12}>
      <h1 className='title'>Join SysHub</h1>
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
                  Register
                </Button>
                <Button color="accent" className={classes.button}>
                  Register & Login
                </Button> 
              </FormGroup>
            </Grid>
          </form>
          <RegisterTest />
      </Grid>
    </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(registerStyle)(Register);
