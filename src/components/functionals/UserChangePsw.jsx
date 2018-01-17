import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userChangePswStyle } from './styles';
import { Button, Grid, FormGroup, Input } from 'material-ui';
import swal from 'sweetalert';
// import components
import { Stats, WelcomeBox } from '../functionals';

class UserChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      match: true
    };

    this.checkPassword = this.checkPassword.bind(this);
    this.submitPassword = this.submitPassword.bind(this);
  }

  checkPassword() {
    const newPass = this.newPassword.value;
    const confirmPass = this.confirmPassword.value;

    if (newPass === confirmPass) {
      this.setState({
        match: true
      });
    } else {
      this.setState({
        match: false
      });
    }
  }

  submitPassword() {
    let updatedUser = {};
    updatedUser.currentPass = this.currentPassword.value;
    updatedUser.newPass = this.newPassword.value;

    if (this.newPassword.value !== this.confirmPassword.value) {
      swal({
        title: 'Oops...',
        text: 'Passwords must match',
        icon: 'error'
      });

      return;
    }

    this.props.onUpdatePassword(updatedUser);
    this.confirmPassword.value = '';
    this.currentPassword.value = '';
    this.newPassword.value = '';
  }

  render() {
    const { classes } = this.props;
    const avatar = require('../../assets/img/no-user-image.gif');
    const checkIcon = require('../../assets/img/check.png');
    const closeIcon = require('../../assets/img/close.png');
    return (
      <div className={classes.root}>
        <Grid container>
          {/* change password text */}
          <Grid md={12}>
            <h1 className="changePsw-text">Change Password</h1>
          </Grid>
          {/* profile credential grid */}
          <Grid md={12} className="changePsw-credential-grid">
            <span className="changedPsw-note">
              Note: You will be redirected to login on successfull completion of password change
            </span>
            {/* For User Name */}
            <FormGroup className="form-group">
              <span htmlFor="user-name" className="label">
                {`Currrent Password: `}
              </span>
              <input
                ref={input => (this.currentPassword = input)}
                name="usernames"
                id="user-name"
                type="password"
                className="input-field"
                placeholder="******"
              />
            </FormGroup>

            {/* For User Email */}
            <FormGroup className="form-group">
              <span htmlFor="user-email" className="label">
                {`New Password: `}
              </span>
              <input
                ref={input => (this.newPassword = input)}
                name="email"
                id="user-name"
                type="password"
                className="input-field"
                placeholder="******"
                onChange={this.checkPassword}
              />
              <span className="validation-message">
                <img src={checkIcon} />
                Password Strength
                <span className="strong">Strong</span>
              </span>
            </FormGroup>
            {/* For User Email */}
            <FormGroup className="form-group">
              <span htmlFor="user-email" className="label">
                {`Confirm Password: `}
              </span>
              <input
                ref={input => (this.confirmPassword = input)}
                name="email"
                type="password"
                id="user-name"
                className="input-field"
                placeholder="******"
                onChange={this.checkPassword}
              />
              <span className="validation-message">
                <img src={this.state.match ? checkIcon : closeIcon} />
                {this.state.match ? 'Passwords Match' : 'Passwords Must Match'}
              </span>
            </FormGroup>
          </Grid>
          <Grid className="update-button-grid">
            <Button
              onClick={this.submitPassword}
              disabled={!this.state.match}
              raised
              color="primary"
              className="update-button"
            >
              Confirm Changes
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(userChangePswStyle)(UserChangePassword)
);
