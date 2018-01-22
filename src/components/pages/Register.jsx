import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { Button, Grid, FormGroup, Input, withStyles } from 'material-ui';
import swal from 'sweetalert';

import { fire } from '../../firebase';

import PropTypes from 'prop-types';

// import withRoot from '../containers/WithRoot';

// import style
import { registerStyle } from './styles';

class Register extends Component {
  state = {
    disabled: false,
    username: null
  };

  // specifying your onload callback function
  callback() {
    console.log('Recaptcha onLoad CallBack: Done!!!!');
  }

  // specifying verify callback function
  verifyCallback(response) {
    console.log('Recaptcha Verify CallBack: ', response);
    this.verify = response;
  }

  checkUsername(event) {
    if (event.target.value.match(/^[0-9a-zA-Z_ ]*$/) == null) {
      swal({
        title: 'Oops...',
        text: 'Must be an alphanumeric character',
        icon: 'warning'
      });

      this.registerForm.reset();
      return;
    }

    this.setState({
      [event.target.name]: event.target.value
    });

    const username = this.registerName.value;

    const usernameRef = fire.database().ref('usernames');
    if (event.target.value) {
      usernameRef.on('value', snapshot => {
        snapshot.forEach(snap => {
          if (snap.val() === username) {
            this.setState({
              disabled: true
            });
            return;
          } else {
            this.setState({
              disabled: false
            });
          }
        });
      });
    }
  }

  register(event) {
    event.preventDefault();

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'You forgot to complete the reCAPTCHA',
        icon: 'error'
      });

      return;
    }

    this.setState({
      username: ''
    });
    const username = this.registerName.value;
    const email = this.registerEmail.value;
    const password = this.registerPsw.value;

    if (!username) {
      swal({
        title: 'Oops...',
        text: 'Must provide a username',
        icon: 'error'
      });

      return;
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const currentUser = fire.auth().currentUser;

        if (user.uid === currentUser.uid) {
          const usernameRef = fire.database().ref('usernames');
          usernameRef.child(user.uid).set(username);
          currentUser.updateProfile({ displayName: username });

          this.registerForm.reset();
          swal({
            title: 'Success',
            text: `Account ${currentUser.email} created`,
            icon: 'success'
          });
        }
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
      checkIcon = require('../../assets/img/check.png'),
      closeIcon = require('../../assets/img/close.png'),
      { classes } = this.props;
    return (
      <Grid container className={classes.root} md={12}>
        <h1 className="title">Join SysHub</h1>
        <Grid item md={12} className="form__container">
          <form
            ref={form => {
              this.registerForm = form;
            }}
            onSubmit={event => {
              this.register(event);
            }}
            className="wrapper"
          >
            <Grid item lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} justify="center">
              {/* For User Name */}
              <FormGroup className="form-group">
                <span htmlFor="user-name" className="label">
                  {`Username: `}
                </span>
                <input
                  ref={input => (this.registerName = input)}
                  name="usernames"
                  id="user-name"
                  className="input-field"
                  placeholder="Enter Username"
                  onChange={e => this.checkUsername(e)}
                />
                <span className="validation-message">
                  <div style={this.state.disabled ? { color: 'red' } : null}>
                    {this.state.usernames &&
                      (!this.state.disabled ? <img src={checkIcon} /> : <img src={closeIcon} />)}
                    {this.state.usernames}
                    {this.state.usernames &&
                      (this.state.disabled ? ` Not Available` : ` Available`)}
                  </div>
                </span>
              </FormGroup>

              {/* For User Email */}
              <FormGroup className="form-group">
                <span htmlFor="user-email" className="label">
                  {`Email: `}
                </span>
                <input
                  ref={input => (this.registerEmail = input)}
                  name="email"
                  id="user-name"
                  className="input-field"
                  placeholder="Enter email"
                />
              </FormGroup>

              {/* For Password */}
              <FormGroup className="form-group">
                <span htmlFor="password" className="label">
                  Password:{' '}
                </span>
                <input
                  ref={input => (this.registerPsw = input)}
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder="**************"
                />
                <span className="validation-message">
                  <img src={checkIcon} />
                  Password Strength
                  <span className="strong">Strong</span>
                </span>
              </FormGroup>

              {/* For Confirm Password */}
              <FormGroup className="form-group">
                <span htmlFor="confirm-password" className="label">
                  Confirm Password:{' '}
                </span>
                <input
                  type="password"
                  id="confirm-password"
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
                    sitekey="6LfhnEEUAAAAACHqYj67uNQ89-4Z-ctwiOD1FRZ8"
                    render="explicit"
                    verifyCallback={this.verifyCallback.bind(this)}
                    onloadCallback={this.callback.bind(this)}
                  />
                </div>
              </FormGroup>

              {/* Terms and Service */}
              <FormGroup className="form-group terms-of-condition">
                <p>
                  I have read and accepted the <a href="#">Terms of Service</a>
                </p>
              </FormGroup>

              {/* Form Action Button */}
              <FormGroup className="form-group form-button-group">
                <Button type="submit" color="primary" className={classes.button}>
                  Register
                </Button>
                <Button type="submit" color="accent" className={classes.button}>
                  Register & Login
                </Button>
              </FormGroup>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(registerStyle)(Register);
