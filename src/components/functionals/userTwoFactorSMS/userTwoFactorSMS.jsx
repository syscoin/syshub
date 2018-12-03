import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import injectSheet from 'react-jss';
import { fire, phoneAuth } from '../../../API/firebase';
import { setFire2FAMethod, getFire2FAstatus } from '../../../API/TwoFA.service';
import { phoneValidation } from '../../../Helpers';
// import { Form, Input, Button } from 'antd';//, Select
import { Button } from 'antd';
import swal from 'sweetalert';

// import Material-ui components
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

// import custom components
import { isoArray } from '../../../assets/isoCodes';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

// Import Style
import userTwoFactorSMSStyle from './userTwoFactorSMS.style';

const PNF = PhoneNumberFormat;
const phoneUtil = PhoneNumberUtil.getInstance();
// const FormItem = Form.Item;
// const Option = Select.Option;
// const InputGroup = Input.Group;

class UserTwoFactorSMS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      isoCode: 'US',
      editNumber: false,
      showModal: false,
      areaCode: '',
      labelWidth: 10
    };

    this.addPhone = this.addPhone.bind(this);
    this.disableAuth = this.disableAuth.bind(this);
    this.enableAuth = this.enableAuth.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editPhone = this.editPhone.bind(this);
    this.removePhone = this.removePhone.bind(this);
    this.handleIsoCode = this.handleIsoCode.bind(this);
    this.handlePhoneChange= this.handlePhoneChange.bind(this);
  }

  async componentDidMount() {
    fire.auth().useDeviceLanguage();
    
    const user = fire.auth().currentUser;
    if (user.phoneNumber == null) {
      const newStatus = await setFire2FAMethod(user.uid, 'sms', false);
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

  handleIsoCode(event) {
    this.setState({
      isoCode: event.target.value
    });
  }

  handlePhoneChange(event) {
    this.setState({
      phoneNumber: event.target.value
    });
    console.log('ACZ phoneNumber -->', this.state.phoneNumber);
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
      .then(async user => {
        this.props.setCurrentUser(user);
        swal({
          title: 'Success',
          text: `Removed phone number from this account.`,
          icon: 'success'
        });

        this.verify = undefined;
        window.recaptchaVerifier.render().then(widgetId => {
          window.recaptchaVerifier.reset(widgetId);
        });

        const newStatus = await setFire2FAMethod(user.uid, 'sms', false);
        this.props.set2FA(newStatus);
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
    this.handleShowModal();
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

    const appVerifier = window.recaptchaVerifier;

    const userNumber = phoneValidation(this.state.phoneNumber, this.state.isoCode, user);

    // const appVerifier = window.recaptchaVerifier;
    const provider = new fire.auth.PhoneAuthProvider();

    phoneAuth(user, provider, phoneUtil.format(userNumber, PNF.E164), appVerifier)
      .then(async success => {
        this.handleHideModal()
        if (success) {
          swal({
            title: 'Sucess',
            text: `New Phone Number added & Two Factor Authentication Enabled`,
            icon: 'success'
          });
          this.verify = undefined;
          window.recaptchaVerifier.render().then(widgetId => {
            window.recaptchaVerifier.reset(widgetId);
          });
          this.setState({
            editNumber: false
          });

          const newStatus = await setFire2FAMethod(user.uid, 'sms', true);
          this.props.set2FA(newStatus);

        }
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  async enableAuth() {
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

    this.verify = undefined;
    window.recaptchaVerifier.render().then(widgetId => {
      window.recaptchaVerifier.reset(widgetId);
    });

    const newStatus = await setFire2FAMethod(user.uid, 'sms', true);
    this.props.set2FA(newStatus);

  }

  async disableAuth() {
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

    const newStatus = await setFire2FAMethod(user.uid, 'sms', false);
    this.props.set2FA(newStatus);


  }
  handleShowModal() {
    this.setState({showModal: true});
  }
  
  handleHideModal() {
    this.setState({showModal: false});
  }

  modalDidMount() {
    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha, {
      callback: response => {
        this.verify = response;
      }
    });

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
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
          onRendered={() => this.modalDidMount()}
        >
          <div className={modalStyle}>
            <form
              ref={form => {
                this.addPhoneForm = form;
              }}
              className="phoneWrapper"
              >
              {app.currentUser.phoneNumber
                ? `Phone Number: ${app.currentUser.phoneNumber}`
                : ''}
              <div>{`Phone number (with area code): `}</div>
              <FormControl variant="outlined" className="formControl">
                <InputLabel ref={ref => {this.InputLabelRef = ref;}} htmlFor="areaCode">
                  Area Code
                </InputLabel>
                <Select
                  value={this.state.isoCode}
                  onChange={this.handleIsoCode}
                  input={
                    <OutlinedInput
                      labelWidth={this.state.labelWidth}
                      name="areaCode"
                      id="areaCode"
                    />
                  }
                >
                 {isoArray.map((item, i) => (
                  <MenuItem value={item.code} key={i}>
                    {item.name}
                  </MenuItem>
                  ))}
                </Select>
              </FormControl>  
              <TextField
                id="phoneInput"
                label="Phone number"
                className="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handlePhoneChange}
                margin="normal"
                variant="outlined"
              />
                {/* <InputGroup compact>  
                  <Select
                    className="phoneCodeSelect"
                    defaultValue="United States"
                    onChange={this.handleIsoCode}
                    >
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
                    className="phoneInput"
                    
                    placeholder="(123) 456-7894"
                    value={this.state.phoneNumber}
                    onChange={this.onChange}
                    type="number"
                    />
                </InputGroup> */}
            </form>
            <div className="reCapthaWraper" ref={ref => (this.recaptcha = ref)} />
            <Grid container directoin="row" justify="space-between" className="formPhoneBtn">
              {app.currentUser &&
                <div>
                  <Button
                    key={1}
                    onClick={this.addPhone}
                    htmlType="submit"
                    variant="raised"
                    >
                    {app.currentUser.phoneNumber? 'Update' : 'Add'}
                  </Button>
                  {app.currentUser.phoneNumber && 
                    <Button
                      key={2}
                      onClick={this.removePhone}
                      htmlType="submit"
                      variant="raised"
                      >
                      {'Delete'}
                    </Button>}
                </div>}
                <Button color="primary" onClick={() => this.handleHideModal()} >
                Cancel
              </Button>
            </Grid>
          </div>
        </Modal> 
        <Grid item md={12} xs={12} className="userTwoFactor">
          <div className="statusWrapper">
            <div className="statusTextSpan">2FA SMS:</div>
            {this.props.app.twoFA.twoFA && <div className="statusEnable"> Enabled </div>}
            {!this.props.app.twoFA.twoFA && <div className="statusDisable"> Not Enabled <br/>
              <span className="lowSecuritySpan">(Low Security)</span>
            </div>}
          </div>
        </Grid>
        {/* // Buttons section */}
        <Grid container direction='row' justify='space-between' className="twoFactor-button-grid">
        <Grid item>
          <Button 
          variant= "raised"
          color="primary"
          className="twoFactor-button"
          onClick={this.editPhone}
          style={{ marginBottom: '15px' }}
          disabled= {!!app.currentUser.phoneNumber}
          >
            Edit Phone
          </Button>
        </Grid>
          <Grid item>
            {this.props.app.twoFA.twoFA &&
              <Button variant= "raised" color="primary" className="twoFactor-button" onClick={this.disableAuth}>Disable 2FA SMS</Button>
            }
            {!this.props.app.twoFA.twoFA &&
              <Button color="primary" className="twoFactor-button" onClick={this.enableAuth}>Enable 2FA SMS</Button>
            }
          </Grid>
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
  injectSheet(userTwoFactorSMSStyle)(UserTwoFactorSMS)
);
