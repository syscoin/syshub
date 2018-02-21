import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withStyles } from 'material-ui';
import { userTwoFactorStyle } from './styles';
import { Grid } from 'material-ui';
import { fire, phoneAuth } from '../../API/firebase';
import { phoneValidation } from '../../Helpers';
import { Form, Input, Button, Select } from 'antd';
import swal from 'sweetalert';

// import components
import { isoArray } from '../../assets/isoCodes';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

const PNF = PhoneNumberFormat;
const phoneUtil = PhoneNumberUtil.getInstance();
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class UserTwoFactor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: null,
      isoCode: 'US',
      editNumber: false
    };

    this.addPhone = this.addPhone.bind(this);
    this.disableAuth = this.disableAuth.bind(this);
    this.enableAuth = this.enableAuth.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editPhone = this.editPhone.bind(this);
    this.removePhone = this.removePhone.bind(this);
    this.handleIsoCode = this.handleIsoCode.bind(this);
  }

  componentDidMount() {
    fire.auth().useDeviceLanguage();

    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha, {
      callback: response => {
        this.verify = response;
      }
    });

    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

    const user = fire.auth().currentUser;
    if (user.phoneNumber == null) {
      fire
        .database()
        .ref('2FA/' + user.uid)
        .set(false);
    }

    fire
      .database()
      .ref('2FA/' + user.uid)
      .on('value', snap => {
        this.props.setAuth(snap.val());
        if (snap.val() === true) {
          fire
            .database()
            .ref('MasterNodes/' + user.uid)
            .on('value', snapshot => {
              if (snapshot.val() === null) {
                return;
              }
              let list = [];
              snapshot.forEach(mn => {
                list.push(mn.val());
              });

              user.MasterNodes = list;

              this.props.setCurrentUser(user);
            });
        }
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleIsoCode(value) {
    console.log(value);
    this.setState({
      isoCode: value
    });
  }

  removePhone() {
    const user = fire.auth().currentUser;
    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Please register/login',
        icon: 'error'
      });
      return;
    }
    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }
    user
      .unlink(fire.auth.PhoneAuthProvider.PROVIDER_ID)
      .then(user => {
        this.props.setCurrentUser(user);
        swal({
          title: 'Success',
          text: `Removed phone number from this account.`,
          icon: 'success'
        });

        fire
          .database()
          .ref('2FA/' + user.uid)
          .set(false);
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  editPhone() {
    const user = fire.auth().currentUser;
    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Please register/login',
        icon: 'error'
      });
      return;
    }

    this.setState({
      editNumber: true
    });
  }

  addPhone() {
    const user = fire.auth().currentUser;

    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Please register/login',
        icon: 'error'
      });
      return;
    }
    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    if (phoneValidation(this.state.phoneNumber, this.state.isoCode, user) === false) {
      return;
    }

    this.setState({ isoCode: 'US', phoneNumber: '' });

    const userNumber = phoneValidation(this.state.phoneNumber, this.state.isoCode, user);

    const appVerifier = window.recaptchaVerifier;
    const provider = new fire.auth.PhoneAuthProvider();

    phoneAuth(user, provider, phoneUtil.format(userNumber, PNF.E164), appVerifier)
      .then(success => {
        if (success) {
          swal({
            title: 'Sucess',
            text: `New Phone Number added & Two Factor Authentication Enabled`,
            icon: 'success'
          });

          fire
            .database()
            .ref('2FA/' + user.uid)
            .set(true);
        }
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  enableAuth() {
    const user = fire.auth().currentUser;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    if (user.phoneNumber == null) {
      this.addPhone();
      return;
    }

    fire
      .database()
      .ref('2FA/' + user.uid)
      .set(true);
  }

  disableAuth() {
    const user = fire.auth().currentUser;

    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }

    fire
      .database()
      .ref('2FA/' + user.uid)
      .set(false);
  }

  render() {
    const { classes, deviceType, app } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    //const { currentUser } = this.props.app;

    return (
      <div className={style}>
        <Grid container>
          {/* change password text */}
          <Grid item md={12} className="heading-grid">
            <h1 className="userTwoFactor-heading">2-Factor-Authentication</h1>
          </Grid>
          {/* userTwofactor left grid */}
          <Grid item md={12} xs={12} className="userTwoFactor-left-grid">
            <span className="enable2FA-note">
              Note: Enabling 2FA to secure your account is recommended
            </span>
            <div className="div-margin">
              <span className="statusText-span">Status:</span>
              <span>
                {this.props.app.auth ? (
                  <span className="status-enable">Enable</span>
                ) : (
                    <span className="status-disable">
                      Disabled
                    <span className="lowSecurity-span">(Low Security)</span>
                    </span>
                  )}
              </span>
            </div>
            {app.currentUser ? (
              app.currentUser.phoneNumber == null || this.state.editNumber ? (
                <Grid item md={12} className="form__container">
                  <Form
                    ref={form => {
                      this.addPhoneForm = form;
                    }}
                    className="phoneWrapper"
                  >
                    <FormItem className="form-group">

                      <label >{`Country & Phonenumber (include area code): `}</label>
                      <InputGroup compact>
                        <Select defaultValue="United States" onChange={this.handleIsoCode}>
                          {isoArray.map((item, i) => (
                            <Option value={item.code} key={i}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                        <Input
                          ref={phoneNumber => (this.phoneNumber = phoneNumber)}
                          id="phoneNumber"
                          name="phoneNumber"
                          style={{ width: '20%' }}
                          placeholder="Phone Number"
                          value={this.state.phoneNumber}
                          onChange={this.onChange}
                          type="number"
                        />
                      </InputGroup>
                    </FormItem>
                  </Form>
                  <Grid className="form-grid-btn">
                    {app.currentUser
                      ? app.currentUser.phoneNumber !== null
                        ? [
                          <Button
                            key={1}
                            onClick={this.removePhone}
                            htmlType="submit"
                            variant="raised"
                          >
                            {'Delete'}
                          </Button>,
                          <Button
                            key={2}
                            onClick={this.addPhone}
                            htmlType="submit"
                            variant="raised"
                          >
                            {'Update'}
                          </Button>
                        ]
                        : null
                      : null}
                  </Grid>
                </Grid>
              ) : (
                  <div>
                    <Button
                      raised
                      color="primary"
                      className="twoFactor-button"
                      onClick={this.editPhone}
                      style={{ marginBottom: '15px' }}
                    >
                      Edit Phone
                  </Button>
                  </div>
                )
            ) : null}
            <div className="reCapthaWraper" ref={ref => (this.recaptcha = ref)} />

            <Grid className="twoFactor-button-grid">
              {this.props.app.auth ? (
                <Button
                  raised
                  color="primary"
                  className="twoFactor-button"
                  onClick={this.disableAuth}
                >
                  Disable 2F Auth
                </Button>
              ) : (
                  <Button
                    raised
                    color="primary"
                    className="twoFactor-button"
                    onClick={this.enableAuth}
                  >
                    Enable 2F Auth
                </Button>
                )}
            </Grid>
          </Grid>
          {/* userTwofactor right grid */}
        </Grid>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(actions.setCurrentUser(user)),
    setAuth: value => dispatch(actions.setAuth(value))
  };
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(userTwoFactorStyle)(UserTwoFactor)
);
