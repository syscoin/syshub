import React, { Component } from 'react';
import ReactPasswordStrength from 'react-password-strength';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userChangePswStyle } from './styles';
import { Grid, FormGroup } from 'material-ui';
import { Form, Input, Button } from 'antd';

// import components
import { Stats, WelcomeBox } from '../functionals';

const FormItem = Form.Item;

class UserChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: '',
    };

    // this.checkPassword = this.confirmDirty.bind(this);
    // this.checkConfirm = this.checkConfirm.bind(this);
    console.log("FromItem",FormItem)
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
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const updatedUser = {
          currentPass: values.current,
          newPass: values.password,
        };
        this.props.onUpdatePassword(updatedUser);
      }
    });
  };

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const avatar = require('../../assets/img/no-user-image.gif');
    const checkIcon = require('../../assets/img/check.png');
    const closeIcon = require('../../assets/img/close.png');
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    // Only show error after a field is touched.
    const currentPasswordTouch =
      isFieldTouched('current') && getFieldError('current');
    const newPasswordTouch =
      isFieldTouched('password') && getFieldError('password');
    const confrimPasswordTouch =
      isFieldTouched('confirm') && getFieldError('confirm');

    return (
      <div className={style}>
        <Grid container className="userPwd-grid">
          {/* change password text */}
          <Grid md={12}>
            <h1 className="changePsw-heading">Change Password</h1>
          </Grid>
          {/* profile credential grid */}
          <Grid md={12} className="changePsw-credential-grid">
            <span className="changedPsw-note">
              Note: You will be redirected to login on successfull completion of
              password change
            </span>
            <div className="formGroup-div">
              <Form onSubmit={this.handleSubmit}>
                {/* For Current Password */}
                <FormItem
                  className="form-group"
                  validateStatus={currentPasswordTouch ? 'error' : ''}
                  help={currentPasswordTouch || ''}
                >
                  <span htmlFor="user-name" className="label">
                    {' '}
                    {`Currrent Password: `}{' '}
                  </span>
                  {getFieldDecorator('current', {
                    rules: [
                      {
                        required: true,
                        message: 'Enter your current password!',
                      },
                    ],
                  })(
                    <Input
                      ref={input => (this.registerName = input)}
                      name="usernames"
                      id="user-name"
                      type="password"
                      className="input-field"
                      placeholder="******"
                    />
                  )}
                </FormItem>

                {/* For New Password */}
                <FormItem
                  className="form-group"
                  validateStatus={newPasswordTouch ? 'error' : ''}
                  help={newPasswordTouch || ''}
                >
                  <span htmlFor="user-email" className="label">
                    {' '}
                    {`New Password: `}{' '}
                  </span>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.checkConfirm,
                      },
                    ],
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
                        scoreWords={[
                          'weak',
                          'okay',
                          'good',
                          'strong',
                          'stronger',
                        ]}
                        inputProps={{
                          name: 'password_input',
                          autoComplete: 'off',
                          className: 'form-control',
                        }}
                      />
                    </div>
                  )}
                </FormItem>

                {/* For Confirm Password */}
                <FormItem
                  className="form-group"
                  validateStatus={confrimPasswordTouch ? 'error' : ''}
                  help={confrimPasswordTouch || ''}
                >
                  <span htmlFor="user-email" className="label">
                    {' '}
                    {`Confirm New Password: `}{' '}
                  </span>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confrim your password!',
                      },
                      {
                        validator: this.checkPassword,
                      },
                    ],
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
                  <Button
                    htmlType="submit"
                    raised
                    className="confirmChange-button"
                    disabled={this.hasErrors(getFieldsError())}
                  >
                    Confirm Changes
                  </Button>
                </Grid>
              </Form>
            </div>
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

// Todo: Antd form
const _userChangePass = Form.create()(UserChangePassword); // Need to add component like this due to antd Form

export default connect(stateToProps, dispatchToProps)(
  withStyles(userChangePswStyle)(_userChangePass)
);
