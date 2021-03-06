import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import actions from '../../../redux/actions';
import swal from 'sweetalert';

// Import provider HOC's
import { withFirebase } from '../../../providers/firebase';

// Import Sevices
import { phoneValidation } from '../../../Helpers';

// Import helpers
import to from '../../../Helpers/to';

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
      withNumber: false,
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
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // add Firebase as global var in component
  firebase = this.props.firebase;

  async componentDidMount() {
    this.firebase.useDeviceLanguage();

    const user = (await this.firebase.getCurrentUser()) || {};
    if (user.phoneNumber == null) {
      const newStatus = await this.firebase.setFire2FAMethod(
        user.uid,
        'sms',
        false
      );
      this.props.set2FA(newStatus);
      this.setState({ withNumber: false });
    } else {
      this.setState({ withNumber: true });
    }

    const twoFAStatus = await this.firebase.getFire2FAstatus(user.uid);
    this.props.set2FA(twoFAStatus);
    if (twoFAStatus.twoFA) {
    }
  }

  async modalDidMount() {
    const user = await this.firebase.getCurrentUser();
    window.recaptchaVerifier = this.firebase.newRecaptchaVerifier('sendSMS', {
      size: 'invisible',
      callback: response => {
        this.verify = response;
        this.sendSMS();
      }
    });
    window.recaptchaVerifier.render();

    if (user && user.phoneNumber) {
      window.recaptchaVerifierDelete = this.firebase.newRecaptchaVerifier(
        'phoneRemover',
        {
          size: 'invisible',
          callback: response => {
            this.verify = response;
            this.removePhone();
          }
        }
      );
      window.recaptchaVerifierDelete.render();
    }
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      verificationId: ''
    });
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
      [field]: event.target.value
    });
  };

  async removePhone() {
    const user = await this.firebase.getCurrentUser();
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
      .unlink(this.firebase.getPhoneAuthProviderID())
      .then(async user => {
        this.props.setCurrentUser(user);
        this.props.onStatusChange('Phone number removed');

        this.verify = undefined;
        window.recaptchaVerifierDelete.render().then(widgetId => {
          window.recaptchaVerifierDelete.reset(widgetId);
        });

        const newStatus = await this.firebase.setFire2FAMethod(
          user.uid,
          'sms',
          false
        );
        this.setState({ withNumber: false });
        this.props.set2FA(newStatus);
        this.handleHideModal();
      })
      .catch(err => {
        swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
      });
  }

  async editPhone() {
    const user = await this.firebase.getCurrentUser();
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
    const user = await this.firebase.getCurrentUser();
    if (!user) {
      swal({
        title: 'Oops...',
        text: 'Please register/login',
        icon: 'error'
      });
      window.recaptchaVerifier.reset();
      return;
    }
    if (!this.verify) {
      swal({
        title: 'Oops...',
        text: 'Please complete reCAPTCHA',
        icon: 'error'
      });
      window.recaptchaVerifier.reset();
      return;
    }
    const userNumber = phoneValidation(
      this.state.phoneNumber,
      this.state.isoCode,
      user
    );
    if (!userNumber) {
      window.recaptchaVerifier.reset();
      return;
    }
    const appVerifier = window.recaptchaVerifier;
    const verificationId = await this.firebase.sendSMSToPhone(
      phoneUtil.format(userNumber, PNF.E164),
      appVerifier
    );
    this.setState({
      showVerifyCode: true,
      verificationId
    });
  }

  async verifySMSCode() {
    let user = await this.firebase.getCurrentUser();
    const verificationId = this.state.verificationId;
    const phoneCode = this.state.phoneVerify;
    if (!phoneCode) {
      this.handleHideModal();
      swal({
        title: 'Oops...',
        text:
          'Please provide your verification code next time. Process canceled',
        icon: 'error'
      });
      return;
    }
    const phoneCredential = await this.firebase.verifyPhoneCode(
      verificationId,
      phoneCode
    );
    if (phoneCredential) {
      const [err] = await to(user.updatePhoneNumber(phoneCredential));

      if (err) {
        swal({
          title: 'Error',
          text: `${err}`,
          icon: 'error'
        });
        return;
      }
      let newStatus = await this.firebase.setFire2FAMethod(
        user.uid,
        'sms',
        true
      );
      newStatus = await this.firebase.setFire2FAMethod(user.uid, 'auth', false);
      this.props.set2FA(newStatus);
      user = await this.firebase.getCurrentUser();
      this.props.setCurrentUser(user);
      this.setState({ withNumber: true });
      this.handleHideModal();
      this.props.onStatusChange('Phone number updated');
    }
  }

  async enableAuth() {
    const user = await this.firebase.getCurrentUser();

    if (!user.phoneNumber) {
      this.handleShowModal();
      return;
    }

    let newStatus = await this.firebase.setFire2FAMethod(user.uid, 'sms', true);
    newStatus = await this.firebase.setFire2FAMethod(user.uid, 'auth', false);
    this.props.set2FA(newStatus);
    this.props.onStatusChange('SMS 2FA enabled');
  }

  async disableAuth() {
    const user = await this.firebase.getCurrentUser();

    const newStatus = await this.firebase.setFire2FAMethod(
      user.uid,
      'sms',
      false
    );
    this.props.set2FA(newStatus);
    this.props.onStatusChange('SMS 2FA disabled');
  }

  handleShowModal() {
    this.setState({ showModal: true });
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
  }

  render() {
    const { classes, deviceType, app } = this.props;
    const currentUser = app.currentUser || {};

    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    const modalStyle =
      deviceType === 'mobile' ? classes.mModalRoot : classes.modalRoot;

    return (
      <Grid container direction="column" className={style}>
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
              <IconButton
                aria-label="Close"
                className="closeBtn"
                onClick={() => this.handleHideModal()}
              >
                <Close fontSize="large" />
              </IconButton>
              <h1>Two-Factor by Phone (SMS)</h1>
              <p>
                This enable Two-Factor Authentication for your account,
                <br /> Follow the instruction to complete setup
              </p>
              {currentUser.phoneNumber && (
                <h3> {`Current number: ${currentUser.phoneNumber}`}</h3>
              )}
              {!currentUser.phoneNumber && (
                <h3> {`Current number: Not found`}</h3>
              )}
            </div>
            <form
              ref={form => {
                this.addPhoneForm = form;
              }}
              className="phoneWrapper"
            >
              <FormControl variant="outlined" className="formControl">
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="areaCode"
                >
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
                  SEND <Send className="rightIcon" />
                </Button>
              </div>
              {this.state.showVerifyCode && (
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
                    VERIFY <DoneAll className="rightIcon" />
                  </Button>
                </div>
              )}
            </form>
            <Grid
              container
              directoin="row"
              justify="center"
              className="formPhoneBtn"
            >
              {currentUser && currentUser.phoneNumber && (
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
              )}
            </Grid>
          </div>
        </Modal>
        <Grid item md={12} xs={12} className="userTwoFactor">
          <div className="statusWrapper">
            <div className="statusTextSpan">2FA SMS:</div>
            {this.props.app.twoFA.sms && (
              <div className="statusEnable"> Enabled </div>
            )}
            {!this.props.app.twoFA.sms && (
              <div className="statusDisable">
                {' '}
                Not Enabled <br />
                <span className="lowSecuritySpan">(Low Security)</span>
              </div>
            )}
          </div>
        </Grid>
        {/* // Buttons section */}
        <Grid
          container
          direction="row"
          justify="space-between"
          className="twoFactorBtnGrid"
        >
          <Grid item>
            <Button
              onClick={this.editPhone}
              className={`twoFactorBtn ${
                this.state.withNumber ? 'active' : 'disabled'
              }`}
              style={{ marginBottom: '15px' }}
              disabled={!this.state.withNumber}
            >
              Edit Phone
            </Button>
          </Grid>
          <Grid item>
            <Button
              id="disable2FASMS"
              className={`twoFactorBtn active ${
                this.props.app.twoFA.sms ? 'show' : 'hide'
              }`}
              onClick={this.disableAuth}
            >
              Disable 2FA SMS
            </Button>
            <Button
              id="enable2FASMS"
              className={`twoFactorBtn active ${
                !this.props.app.twoFA.sms ? 'show' : 'hide'
              }`}
              onClick={this.enableAuth}
            >
              Enable 2FA SMS
            </Button>
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
    set2FA: auth => dispatch(actions.set2FA(auth))
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(userTwoFactorSMSStyle)
)(UserTwoFactorSMS);
