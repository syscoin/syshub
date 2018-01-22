import React, { Component } from 'react';
import ReactPasswordStrength from 'react-password-strength';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userChangePswStyle } from './styles';
<<<<<<< HEAD
import { Grid, FormGroup } from 'material-ui';
import { Form, Input, Button } from 'antd';

=======
import { Button, Grid, FormGroup, Input } from 'material-ui';
import swal from 'sweetalert';
>>>>>>> 9-implement-the-firebase-backend-to-manage-user-account
// import components
import { Stats, WelcomeBox } from '../functionals';

const FormItem = Form.Item;


class UserChangePassword extends Component {
  constructor(props) {
    super(props);

<<<<<<< HEAD
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: ''
    }

    // this.checkPassword = this.confirmDirty.bind(this);
    // this.checkConfirm = this.checkConfirm.bind(this);
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
=======
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
>>>>>>> 9-implement-the-firebase-backend-to-manage-user-account
  }

  render() {
    const { classes } = this.props;
    const avatar = require('../../assets/img/no-user-image.gif');
<<<<<<< HEAD
    const checkIcon = require('../../assets/img/check.png')
    const closeIcon = require('../../assets/img/close.png')
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


    // Only show error after a field is touched.
    const currentPasswordTouch = isFieldTouched('current') && getFieldError('current');
    const newPasswordTouch = isFieldTouched('password') && getFieldError('password');
    const confrimPasswordTouch = isFieldTouched('confirm') && getFieldError('confirm');

=======
    const checkIcon = require('../../assets/img/check.png');
    const closeIcon = require('../../assets/img/close.png');
>>>>>>> 9-implement-the-firebase-backend-to-manage-user-account
    return (
      <div className={classes.root}>
        <Grid container>
          {/* change password text */}
          <Grid md={12}>
<<<<<<< HEAD
            <h1 className='changePsw-heading'>Change Password</h1>
          </Grid>
          {/* profile credential grid */}
          <Grid md={12} className='changePsw-credential-grid'>
            <span className="changedPsw-note">Note: You will be redirected to login on successfull completion of password change</span>
            <div className="formGroup-div">
              <Form onSubmit={this.handleSubmit}>

                {/* For Current Password */}
                <FormItem className="form-group" validateStatus={currentPasswordTouch ? 'error' : ''} help={currentPasswordTouch || ''}>
                  <span htmlFor="user-name" className="label"> {`Currrent Password: `} </span>
                  {getFieldDecorator('current', {
                    rules: [{
                      required: true, message: 'Enter your current password!',
                    }],
                  })(
                    <Input
                      ref={input => (this.registerName = input)}
                      name="usernames"
                      id="user-name"
                      type="password"
                      className="input-field"
                      placeholder="******" />
                    )}
                </FormItem>

                {/* For New Password */}
                <FormItem className="form-group" validateStatus={newPasswordTouch ? 'error' : ''} help={newPasswordTouch || ''} >
                  <span htmlFor="user-email" className="label"> {`New Password: `} </span>
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: 'Please input your password!',
                    }, {
                      validator: this.checkConfirm,
                    }],
                  })(
                    <div style={{ display: 'inline' }}>
                      <ReactPasswordStrength
                        name="email"
                        id="user-name"
                        type="password"
                        className="input-password-feild"
                        style={{ height: '34px', borderRadius: '3px' }}
                        placeholder="******"
                        minLength={5}
                        minScore={2}
                        scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                        inputProps={{ name: "password_input", autoComplete: "off", className: "form-control" }}
                      />
                      <span className="validation-message">
                        <img src={checkIcon} />
                        Password Strength
                      </span>
                    </div>
                    )}
                </FormItem>


                {/* For Confirm Password */}
                <FormItem className="form-group" validateStatus={confrimPasswordTouch ? 'error' : ''} help={confrimPasswordTouch || ''} >
                  <span htmlFor="user-email" className="label"> {`Confirm New Password: `} </span>
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Please confrim your password!',
                    }, {
                      validator: this.checkPassword,
                    }],
                  })(
                    <Input
                      ref={input => (this.registerEmail = input)}
                      name="email"
                      type="password"
                      id="user-name"
                      className="input-field"
                      placeholder="******"
                    />
                    )}
                </FormItem>
                <Grid className="confirmChange-button-grid">
                  <Button htmlType="submit" raised className="confirmChange-button" disabled={this.hasErrors(getFieldsError())}>Confirm Changes</Button>
                </Grid>
              </Form>
            </div>
          </Grid>
        </Grid>

=======
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
>>>>>>> 9-implement-the-firebase-backend-to-manage-user-account
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

<<<<<<< HEAD
// Todo: Antd form
const _userChangePass = Form.create()(UserChangePassword) // Need to add component like this due to antd Form

export default connect(stateToProps, dispatchToProps)(
  withStyles(userChangePswStyle)(_userChangePass)
=======
export default connect(stateToProps, dispatchToProps)(
  withStyles(userChangePswStyle)(UserChangePassword)
>>>>>>> 9-implement-the-firebase-backend-to-manage-user-account
);
