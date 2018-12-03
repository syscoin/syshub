import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import injectSheet from 'react-jss';
import { fire } from '../../../API/firebase';
import { setFire2FAMethod, getFire2FAstatus } from '../../../API/TwoFA.service';
import { Form, Input, Button, Select } from 'antd';
import swal from 'sweetalert';

// import Material-ui components
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

// import components
import { isoArray } from '../../../assets/isoCodes';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

// Import Style
import userTwoFactorAuthStyle from './userTwoFactorAuth.style';

// Import Auth libs
const speakeasy = require('speakeasy');
const QRCode = require('qrcode')

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class UserTwoFactorAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: null,
      isoCode: 'US',
      editNumber: false
    };

    this.disableAuth = this.disableAuth.bind(this);
    this.enableAuth = this.enableAuth.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    fire.auth().useDeviceLanguage();

    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha, {
      callback: response => {
        this.verify = response;
      }
    });

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

    const user = fire.auth().currentUser;
    if (user.phoneNumber == null) {
      const newStatus = await setFire2FAMethod(user.uid, 'auth', false);
      this.props.set2FA(newStatus);
    }

    const twoFAStatus = await getFire2FAstatus(user.uid);
    this.props.set2FA(twoFAStatus);

    if (twoFAStatus.twoFA) {
      fire.database().ref('MasterNodes/' + user.uid).once('value', snapshot => {
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
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  enableAuth() {
    const secret = speakeasy.generateSecret();
    let QRCodeURL;

    QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
      QRCodeURL = data_url;
    });

    console.log('ACZ Secret --> ', secret);
    console.log('ACZ QRCodeURL -->', QRCodeURL);


    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      return;
    }
    
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

    this.verify = undefined;
    window.recaptchaVerifier.render().then(widgetId => {
      window.recaptchaVerifier.reset(widgetId);
    });

    fire
      .database()
      .ref(`2FA/${user.uid}`)
      .set(false);
  }

  render() {
    const { classes, deviceType, app } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const modalStyle = deviceType === 'mobile' ? classes.mModalRoot : classes.modalRoot;

    //const { currentUser } = this.props.app;

    return (
      <Grid
        container
        direction="column"
        className={style}
      >
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.showModal}
          onClose={() => this.handleHideModal()}
        >
          <div className={modalStyle}>
            aqui va lo chulo
          </div>
        </Modal> 
        <Grid item md={12} xs={12} className="userTwoFactor">
          <div className="statusWrapper">
            <div className="statusTextSpan">Google<br/>Authenticator:</div>
            {this.props.app.twoFA.auth && <div className="statusEnable"> Enabled </div>}
            {!this.props.app.twoFA.auth && <div className="statusDisable"> Not Enabled <br/>
              <span className="lowSecuritySpan">(Low Security)</span>
            </div>}
          </div>
        </Grid>
        <div className="reCapthaWraper" ref={ref => (this.recaptcha = ref)} />
        {app.currentUser && (
          app.currentUser.phoneNumber == null || this.state.editNumber ? (
            <Grid item md={12} className="form__container">
              <Form
                ref={form => {
                  this.addPhoneForm = form;
                }}
                className="phoneWrapper"
              >
                <FormItem className="form-group">
                  {app.currentUser.phoneNumber
                    ? `Phone Number: ${app.currentUser.phoneNumber}`
                    : ''}
                  <br />
                  <label>{`Phone number (with area code): `}</label>
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
                      id="pN"
                      name="phoneNumber"
                      style={{ width: '20%' }}
                      placeholder="(123) 456-7894"
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
                variant= "raised"
                color="primary"
                className="twoFactor-button"
                onClick={this.editPhone}
                style={{ marginBottom: '15px' }}
              >
                Edit Phone
              </Button>
            </div>
          )
        )}
        <Grid className="twoFactor-button-grid">
            {this.props.app.auth ? (
              <Button
                variant= "raised"
                color="primary"
                className="twoFactor-button"
                onClick={this.enableAuth}
              >
                Disable 2FA
              </Button>
            ) : (
              <Button 
                color="primary"
                className="twoFactor-button"
                onClick={this.enableAuth}
              >
                Enable 2FA
              </Button>
            )}
          </Grid>
      </Grid>
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
    set2FA: auth => dispatch(actions.set2FA(auth)),

  };
};

export default connect(stateToProps, dispatchToProps)(
  injectSheet(userTwoFactorAuthStyle)(UserTwoFactorAuth)
);
