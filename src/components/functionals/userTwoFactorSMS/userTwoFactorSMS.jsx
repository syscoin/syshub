import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import swal from 'sweetalert';

// Import Sevices
import { fire } from '../../../API/firebase';
import { sendSMSToPhone, verifyPhoneCode } from '../../../API/TwoFA.service';
import { setFire2FAMethod, getFire2FAstatus } from '../../../API/TwoFA.service';
import { phoneValidation } from '../../../Helpers';

// import Material-ui components
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

// Import Material-ui Icons
import Send from '@material-ui/icons/Send';
import DoneAll from '@material-ui/icons/DoneAll';
import Close from '@material-ui/icons/Close';

// import custom components
import { isoArray } from '../../../assets/isoCodes';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

// Import Style
import injectSheet from 'react-jss';
import userTwoFactorSMSStyle from './userTwoFactorSMS.style';

const PNF = PhoneNumberFormat;
const phoneUtil = PhoneNumberUtil.getInstance();

class UserTwoFactorSMS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      phoneVerify: '',
      isoCode: 'US',
      areaCode: '',
      verificationId: '',
      showModal: false,
      showVerifyCode: false,
      labelWidth: 10
    };

    this.disableAuth = this.disableAuth.bind(this);
    this.enableAuth = this.enableAuth.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editPhone = this.editPhone.bind(this);
    this.removePhone = this.removePhone.bind(this);
    this.handleIsoCode = this.handleIsoCode.bind(this);
    this.handleInputChange= this.handleInputChange.bind(this);
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
      window.recaptchaVerifierEnable2FASMS = new fire.auth.RecaptchaVerifier('enable2FASMS', {
        size: 'invisible',
        callback: response => {
          this.verify = response;
          this.enableAuth();
        }
      });
      window.recaptchaVerifierEnable2FASMS.render();

      window.recaptchaVerifierDisable2FASMS = new fire.auth.RecaptchaVerifier('disable2FASMS', {
        size: 'invisible',
        callback: response => {
          this.verify = response;
          this.disableAuth();
        }
      });
      window.recaptchaVerifierDisable2FASMS.render();
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

  handleInputChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

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
        window.recaptchaVerifierDelete.render().then(widgetId => {
          window.recaptchaVerifierDelete.reset(widgetId);
        });

        const newStatus = await setFire2FAMethod(user.uid, 'sms', false);
        this.props.set2FA(newStatus);
        this.handleHideModal();
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
  }

  async sendSMS() {
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
    const userNumber = phoneValidation(this.state.phoneNumber, this.state.isoCode, user);
    if (!userNumber) {return}
    const provider = new fire.auth.PhoneAuthProvider();
    const appVerifier = window.recaptchaVerifier;
    const verificationId = await sendSMSToPhone(provider, phoneUtil.format(userNumber, PNF.E164), appVerifier);
    this.setState({
      showVerifyCode: true,
      verificationId
    });
  }

  async verifySMSCode () {
    let user = fire.auth().currentUser;
    const verificationId = this.state.verificationId;
    const phoneCode = this.state.phoneVerify;
    if (!phoneCode) {
      this.handleHideModal();
      swal({
        title: 'Oops...',
        text: 'Please provide your verificatoin code next time. Process canceled',
        icon: 'error'
      });
      return;
    }
    const phoneCredential = await verifyPhoneCode(verificationId, phoneCode);
    if (phoneCredential) {
      user.updatePhoneNumber(phoneCredential);
      const newStatus = await setFire2FAMethod(user.uid, 'sms', true);
      this.props.set2FA(newStatus);
      user = await fire.auth().currentUser;
      this.props.setCurrentUser(user);
      this.handleHideModal();
      swal({
        title: 'Sucess',
        text: `New Phone Number added & Two Factor Authentication Enabled`,
        icon: 'success'
      });
    }
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

    if (!user.phoneNumber) {
      this.handleShowModal();
      return;
    }

    this.verify = undefined;
    window.recaptchaVerifierEnable2FASMS.render().then(widgetId => {
      window.recaptchaVerifierEnable2FASMS.reset(widgetId);
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
    window.recaptchaVerifierDisable2FASMS.render().then(widgetId => {
      window.recaptchaVerifierDisable2FASMS.reset(widgetId);
    });

    const newStatus = await setFire2FAMethod(user.uid, 'sms', false);
    this.props.set2FA(newStatus);
  }
  
  handleShowModal() {
    this.setState({showModal: true});
  }
  
  handleHideModal() {
    this.setState({
      phoneNumber: '',
      phoneVerify: '',
      isoCode: 'US',
      areaCode: '',
      verificationId: '',
      showModal: false,
      showVerifyCode: false
    });
    this.verify = false;
    window.recaptchaVerifierEnable2FASMS.render().then(widgetId => {
      window.recaptchaVerifierEnable2FASMS.reset(widgetId);
    });
  }

  modalDidMount() {
    const user = fire.auth().currentUser;
    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier('sendSMS', {
      size: 'invisible',
      callback: response => {
        this.verify = response;
        this.sendSMS();
      }
    });
    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });

    if (user && user.phoneNumber) {
      window.recaptchaVerifierDelete = new fire.auth.RecaptchaVerifier('phoneRemover', {
        size: 'invisible',
        callback: response => {
          this.verify = response;
          this.removePhone();
        }
      });
      window.recaptchaVerifierDelete.render().then(function(widgetId) {
        window.recaptchaWidgetDeleteId = widgetId;
      });
    }
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      verificationId: ''
    });
  }

  render() {
    const { classes, deviceType, app } = this.props;

    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const modalStyle = deviceType === 'mobile' ? classes.mModalRoot : classes.modalRoot;

    return (
      <Grid
        container
        direction="column"
        className={style}
        >
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableBackdropClick
          open={this.state.showModal}
          onClose={() => this.handleHideModal()}
          onRendered={() => this.modalDidMount()}
        >
          <div className={modalStyle}>
            <div className="modalHeaderWrapper">
              <IconButton aria-label="Close" className="closeBtn" onClick={() => this.handleHideModal()}>
                <Close fontSize="large"/>
              </IconButton>
              <h1>Two-Factor by Phone (SMS)</h1>
              <p>This enable Two-Factor Authentication for your account,<br/> Follow the instruction to complete setup</p>
              {app.currentUser.phoneNumber && <h3> { `Current number: ${app.currentUser.phoneNumber}`}</h3>}
              {!app.currentUser.phoneNumber && <h3> {`Current number: Not found`}</h3>}
            </div>

              <form
                ref={form => { this.addPhoneForm = form }}
                className="phoneWrapper"
                >
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
                <div className="phoneRow">
                <TextField
                  id="phoneInput"
                  label="Phone number"
                  className="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.handleInputChange('phoneNumber')}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  id="sendSMS"
                  color="primary"
                  className="phoneBtn"
                  key={'sms'}
                  variant="outlined"
                  size="large"
                  >
                  SEND <Send className="rightIcon"/>
                </Button>
                </div>
                {this.state.showVerifyCode &&
                  <div className="phoneRow">
                    <TextField
                      id="phoneVerify"
                      label="Enter verification Code"
                      className="phoneNumber"
                      value={this.state.phoneVerify}
                      onChange={this.handleInputChange('phoneVerify')}
                      margin="normal"
                      variant="outlined"
                    />
                    <Button
                      id="verifySMSCode"
                      color="primary"
                      className="phoneBtn"
                      key={'code'}
                      variant="outlined"
                      size="large"
                      onClick={() => this.verifySMSCode()}
                      >
                      VERIFY <DoneAll className="rightIcon"/>
                    </Button>
                  </div>
                }
              </form>
              <Grid container directoin="row" justify="center" className="formPhoneBtn">
                {app.currentUser &&
                  app.currentUser.phoneNumber && 
                    <Button
                      id="phoneRemover"
                      key={2}
                      className="deleteBtn"
                      variant="outlined"
                      color="secondary"
                      size="large"
                      >
                      {'DELETE PHONE NUMBER'}
                    </Button>
                }
              </Grid>
            </div>
        </Modal> 
        <Grid item md={12} xs={12} className="userTwoFactor">
          <div className="statusWrapper">
            <div className="statusTextSpan">2FA SMS:</div>
            {this.props.app.twoFA.sms && <div className="statusEnable"> Enabled </div>}
            {!this.props.app.twoFA.sms && <div className="statusDisable"> Not Enabled <br/>
              <span className="lowSecuritySpan">(Low Security)</span>
            </div>}
          </div>
        </Grid>
        {/* // Buttons section */}
        <Grid container direction='row' justify='space-between' className="twoFactor-button-grid">
        <Grid item>
          <Button 
          color="primary"
          className="twoFactor-button"
          onClick={this.editPhone}
          style={{ marginBottom: '15px' }}
          disabled={!app.currentUser.phoneNumber}
          >
            Edit Phone
          </Button>
        </Grid>
          <Grid item>
            <Button id="disable2FASMS" color="primary" className={`twoFactor-button ${ this.props.app.twoFA.sms ? 'show':'hide'}`} >Disable 2FA SMS</Button>
            <Button id="enable2FASMS"  color="primary" className={`twoFactor-button ${!this.props.app.twoFA.sms ? 'show':'hide'}`} >Enable 2FA SMS </Button>
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
