import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import { Button, Grid, FormGroup, withStyles } from 'material-ui';
import swal from 'sweetalert';
import { Input } from 'antd';

import { fire } from '../../firebase';
import actions from '../../redux/actions';

import PropTypes from 'prop-types';

// import withRoot from '../containers/WithRoot';

// import style
import { registerStyle } from './styles';

class Register extends Component {
  constructor(props) {
    super(props);

    this.checkUsername = this.checkUsername.bind(this);
    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.register = this.register.bind(this);
  }

  state = {
    disabled: false,
    username: null,
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
        icon: 'warning',
      });

      this.registerForm.reset();
      return;
    }

    this.setState({
      [event.target.name]: event.target.value,
    });

    const username = this.registerName.value;

    const usernameRef = fire.database().ref('usernames');
    if (event.target.value) {
      usernameRef.on('value', snapshot => {
        snapshot.forEach(snap => {
          if (snap.val() === username) {
            this.setState({
              disabled: true,
            });
            return;
          } else {
            this.setState({
              disabled: false,
            });
          }
        });
      });
    }
  }

  register(event) {
    event.preventDefault();

    if (this.state.disabled) {
      swal({
        title: 'Oops...',
        text: 'Username already taken',
        icon: 'error',
      });
      return;
    }

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'You forgot to complete the reCAPTCHA',
        icon: 'error',
      });

      return;
    }

    this.setState({
      username: '',
    });
    const username = this.registerName.input.value;
    const email = this.registerEmail.input.value;
    const password = this.registerPsw.input.value;

    if (!username) {
      swal({
        title: 'Oops...',
        text: 'Must provide a username',
        icon: 'error',
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
          this.props.setPage('home');
          swal({
            title: 'Success',
            text: `Account ${currentUser.email} created`,
            icon: 'success',
          });
        }
      })
      .catch(err => {
        swal({
          title: 'Oops...',
          text: `${err}`,
          icon: 'error',
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
            <Grid
              item
              lg={{ size: 8, offset: 2 }}
              md={{ size: 10, offset: 1 }}
              justify="center"
            >
              {/* For User Name */}
              <FormGroup className="form-group">
                <span htmlFor="user-name" className="label">
                  {`Username: `}
                </span>
                <Input
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
                      (!this.state.disabled ? (
                        <img src={checkIcon} />
                      ) : (
                        <img src={closeIcon} />
                      ))}
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
                <Input
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
                <Input
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
                <Input
                  type="password"
                  id="confirm-password"
                  className="input-field"
                  type="password"
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
                <Button
                  disabled={this.state.disabled}
                  type="submit"
                  color="accent"
                  className={classes.button}
                >
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
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  //pass the providers
  return {};
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    setPage: page => dispatch(actions.setPage(page)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(registerStyle)(Register)
);
