import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Material-ui components
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

// Import Material-ui Icons
import DoneAll from '@material-ui/icons/DoneAll';
import Close from '@material-ui/icons/Close';

// Import style pages
import injectSheet from 'react-jss';
import twoFactorModalChallengeStyle from './twoFactorModalChallenge.style';

class TwoFactorModalChallenge extends Component {
  state = {
    phoneVerify: '',
    token: '',
    };

  componentWillMount() {}

  componentDidMount() {}

  modalDidMount() {}

  handleHideModal = () => {
    this.props.onClose(false);
  }

  returnCodes = () => {
    const codes = {smsCode: this.state.phoneVerify, gToken: this.state.token};
    this.props.onVerify(codes);
    this.handleHideModal();
  }

  handleInputChange = field => event => {
    this.setState({
      [field]: event.target.value,
      tokenInputError: false
    });
  };

  render() {
    const { classes, deviceType, twoFAStatus, showModal } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    
    return (
      <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableBackdropClick
          open={showModal}
          onClose={() => this.handleHideModal()}
          onRendered={() => this.modalDidMount()}
        >
          <div className={style}>
            <div className="modalHeaderWrapper">
              <div>
                <h2 className="modalTitle">Two-Factor Challenge</h2>
                <p className ="modalSubTitle" >Enter token to continue Login</p>
              </div>
              <IconButton aria-label="Close" className="closeBtn" onClick={() => this.handleHideModal()}>
                <Close fontSize="large"/>
              </IconButton>
            </div>
            <div className="modalBodyWrapper">
              <div id="smsToken" className="inputWrapper">
                {twoFAStatus.sms && <TextField
                  id="phoneVerify"
                  label="SMS Code"
                  className={`codeInput ${twoFAStatus.auth ? '' : 'fullWidth'}`}
                  helperText={this.state.tokenInputError? 'Code do not match!':' '}
                  value={this.state.phoneVerify}
                  onChange={this.handleInputChange('phoneVerify')}
                  margin="normal"
                  variant="outlined"
                  size="small"
                />}
                {twoFAStatus.auth && <TextField
                  error={this.state.tokenInputError}
                  id="token"
                  label="Google Token"
                  className={`codeInput ${twoFAStatus.sms ? '' : 'fullWidth'}`}
                  helperText={this.state.tokenInputError? 'Code do not match!':' '}
                  value={this.state.token}
                  onChange={this.handleInputChange('token')}
                  margin="normal"
                  variant="outlined"
                  size="small"
                  fullWidth={!twoFAStatus.sms}

                />}
              </div>
                <Button
                  id="verifySMSCode"
                  color="primary"
                  className="verifyCode"
                  key={'code'}
                  variant="outlined"
                  size="large"
                  onClick={() => this.returnCodes()}
                  >
                  VERIFY <DoneAll className="rightIcon"/>
                </Button>
            </div>
          </div>
        </Modal> 
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
  injectSheet(twoFactorModalChallengeStyle)(TwoFactorModalChallenge)
);
