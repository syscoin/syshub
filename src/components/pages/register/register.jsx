import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

//Imports providers HOC's
import { withFirebase } from '../../../providers/firebase';

// Imports helpers
import to from '../../../Helpers/to';

//Import UI components
import { Grid } from '@material-ui/core';
import swal from 'sweetalert';
import { Form, Input, Button, Checkbox } from 'antd';
import ReactPasswordStrength from 'react-password-strength';

import actions from '../../../redux/actions';
import PropTypes from 'prop-types';

// import style
import injectSheet from 'react-jss';
import registerStyle from './register.style';

const FormItem = Form.Item;

class Register extends Component {
  constructor(props) {
    super(props);

    this.checkUsername = this.checkUsername.bind(this);
    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.register = this.register.bind(this);
    this.state = {
      checked: false,
      disabled: false,
      username: null,
      confirmDirty: '',
      disableRegisterButton: true,
      verify: null
    };
  }

  async componentDidMount() {
    const { firebase } = this.props;

    // To disabled submit button at the beginning.
    this.props.form.validateFields();

    await firebase.auth.useDeviceLanguage();

    window.recaptchaVerifier = firebase.newRecaptchaVerifier(this.recaptcha, {
      callback: response => {
        this.setState({
          verify: response
        });
      }
    });

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Passwords do not match!');
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

  checkEmail = (rule, value, callback) => {
    //const emaiRegex = /^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-zA-Z][a-zA-Z-0-9]*\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
    const emailRegex = /^[a-zA-Z0-9._-]*@[a-zA-Z][a-zA-Z-0-9]*\.[a-zA-Z]+(\.[a-zA-Z]+)?$/;
    const isValidEmail = emailRegex.test(value) ? true : false;
    const erroMsg = value
      ? 'Invalid Email address format'
      : 'Enter a valid Email address';
    if (!isValidEmail) {
      callback(erroMsg);
    } else {
      callback();
    }
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  onChange = e => {
    if (this.state.disableRegisterButton === false) {
      this.setState({
        checked: e.target.checked,
        disableRegisterButton: true
      });
    } else {
      this.setState({
        checked: e.target.checked,
        disableRegisterButton: false
      });
    }
  };

  // specifying your onload callback function
  callback() {}

  // specifying verify callback function
  verifyCallback(response) {
    this.setState({ verify: response });
  }

  async checkUsername(event) {
    const { firebase } = this.props;
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    if (trimmedValue.match(/^[0-9a-zA-Z_ ]*$/) == null) {
      swal({
        title: 'Oops...',
        text: 'Must be an alphanumeric character',
        icon: 'warning'
      });
      return;
    }

    const isUsernameAvailable = await firebase.isUsernameAvailable(
      trimmedValue
    );
    this.setState({
      [name]: trimmedValue,
      disabled: !isUsernameAvailable
    });
  }

  async register(event) {
    const { firebase } = this.props;
    event.preventDefault();

    if (this.state.disabled) {
      swal({
        title: 'Oops...',
        text: 'username is taken',
        icon: 'error'
      });
      return;
    }

    if (!this.state.verify) {
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
    let username, email, password;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        username = values.username;
        email = values.email;
        password = values.password;
      }
    });

    if (!username) {
      swal({
        title: 'Oops...',
        text: 'Must provide a username',
        icon: 'error'
      });

      return;
    }

    const [err, newUser] = await to(
      firebase.doCreateUserWithEmailAndPassword(email, password)
    );
    if (err) {
      swal({
        title: 'Oops...',
        text: `${err}`,
        icon: 'error'
      });
      return;
    }
    if (newUser) {
      const currentUser = await firebase.getCurrentUser();
      if (newUser.uid === currentUser.uid) {
        await firebase.addUsername(newUser.uid, username);
        currentUser.updateProfile({ displayName: username });
      }
      this.props.setPage('home');
    }
  }

  render() {
    const checkIcon = require('../../../assets/img/check.png'),
      closeIcon = require('../../../assets/img/close.png'),
      { classes, deviceType } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    // Only show error after a field is touched.
    const username = isFieldTouched('username') && getFieldError('username');
    const email = isFieldTouched('email') && getFieldError('email');
    const password = isFieldTouched('password') && getFieldError('password');
    const confirmPassword =
      isFieldTouched('confirm') && getFieldError('confirm');

    return (
      <Grid item className={style} md={12} xs={12}>
        <h1 className="title">JOIN SYSHUB</h1>
        <Grid item md={12} xs={12} className="form__container">
          <Form
            ref={form => {
              this.registerForm = form;
            }}
            onSubmit={event => {
              this.register(event);
            }}
            className="wrapper"
          >
            <Grid item lg={12} md={12} xs={12}>
              {/* For User Name */}
              <FormItem
                className="form-group"
                validateStatus={username ? 'error' : ''}
                help={username || ''}
              >
                <span htmlFor="user-name" className="label">
                  {`Username: `}
                </span>
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: 'Enter a Username!'
                    }
                  ]
                })(
                  <Input
                    ref={input => (this.registerName = input)}
                    name="usernames"
                    id="user-name"
                    className="input-field"
                    placeholder="new-username"
                    onChange={this.checkUsername}
                    onBlur={this.checkUsername}
                  />
                )}

                {this.state.usernames ? (
                  <span className="validation-message">
                    <div style={this.state.disabled ? { color: 'red' } : null}>
                      {!this.state.disabled ? (
                        <img alt="a" src={checkIcon} />
                      ) : (
                        <img alt="a" src={closeIcon} />
                      )}
                      {this.state.usernames}
                      {this.state.disabled ? ` Not Available` : ` Available`}
                    </div>
                  </span>
                ) : null}
              </FormItem>

              {/* For User Email */}
              <FormItem
                className="form-group"
                validateStatus={email ? 'error' : ''}
                help={email || ''}
              >
                <span htmlFor="user-email" className="label">
                  {`Email: `}
                </span>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      validator: this.checkEmail
                    }
                  ]
                })(
                  <Input
                    ref={input => (this.registerEmail = input)}
                    name="email"
                    id="user-name"
                    className="input-field"
                    placeholder="your-name@company.com"
                  />
                )}
              </FormItem>

              {/* For Password */}
              <FormItem
                className="form-group"
                validateStatus={password ? 'error' : ''}
                help={password || ''}
              >
                <span htmlFor="password" className="label">
                  Password:{' '}
                </span>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Enter a password!'
                    },
                    {
                      validator: this.checkConfirm
                    }
                  ]
                })(
                  <div style={{ display: 'inline' }}>
                    <ReactPasswordStrength
                      name="email"
                      id="user-name"
                      type="password"
                      ref={input => (this.registerPsw = input)}
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
                        'stronger'
                      ]}
                      inputProps={{
                        name: 'password_input',
                        autoComplete: 'off',
                        className: 'form-control'
                      }}
                    />
                  </div>
                )}
              </FormItem>

              {/* For Confirm Password */}
              <FormItem
                className="form-group"
                validateStatus={confirmPassword ? 'error' : ''}
                help={confirmPassword || ''}
              >
                <span htmlFor="confirm-password" className="label">
                  Confirm Password:
                </span>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Reenter your password!'
                    },
                    {
                      validator: this.checkPassword
                    }
                  ]
                })(
                  <Input
                    type="password"
                    id="confirm-password"
                    className="input-field"
                    placeholder="your-password"
                  />
                )}
              </FormItem>

              {/* For Confirm Password */}
              <FormItem className="form-group">
                <span htmlFor="confirm-password" className="label">
                  {`Captcha: `}
                </span>
                <div
                  ref={ref => (this.recaptcha = ref)}
                  className="recaptcha"
                />
              </FormItem>
              {/* Terms and Service */}
              <FormItem className="form-group terms-of-condition">
                <Checkbox checked={this.state.checked} onChange={this.onChange}>
                  I agree to use this web application at my own risk
                  {/*I have read and accepted the <a>Terms of Service</a>*/}
                </Checkbox>
              </FormItem>

              {/* Form Action Button */}
              <FormItem className="form-group form-button-group">
                <Button
                  disabled={
                    this.hasErrors(getFieldsError()) ||
                    (!this.state.checked || !this.state.verify)
                      ? true
                      : false
                  }
                  type="primary"
                  htmlType="submit"
                  className={classes.button}
                >
                  <span>Register & Login</span>
                </Button>
              </FormItem>
            </Grid>
          </Form>
        </Grid>
      </Grid>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {};
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    setPage: page => dispatch(actions.setPage(page))
  };
}

// Todo: Antd form
const _RegisterForm = Form.create()(Register); // Need to add component like this due to antd Form

export default compose(
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectSheet(registerStyle)
)(_RegisterForm);
