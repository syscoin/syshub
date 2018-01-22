import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userTwoFactorStyle } from './styles';
import { Button, Grid, FormGroup, Input } from 'material-ui';
import { fire } from '../../firebase';
import swal from 'sweetalert';

// import components
import { Stats, WelcomeBox } from '../functionals';

import QRCode from 'qrcode.react';
class UserTwoFactor extends Component {
  constructor(props) {
    super(props);

    this.addPhone = this.addPhone.bind(this);
  }

  addPhone(event) {
    const user = fire.auth().currentUser;

    if (event.target.checked) {
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        title: 'Add Phone Number',
        text: 'Please include your country code as well as area code as well.',
        icon: 'info',
        buttons: true,
        dangerMode: true,
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Provide Phone Number',
            type: 'number'
          }
        }
      }).then(value => {
        if (value) {
          user
            .updateProfile({ phoneNumber: `${value}` })
            .then(() => {
              swal({ title: 'Success', text: 'Account Updated', icon: 'success' });
              console.log(user);
            })
            .catch(err => {
              swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
            });
        }
      });
    } else if (event.target.checked === false) {
      user
        .updateProfile({ phoneNumber: null })
        .then()
        .catch(err => {
          swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
        });
    }
  }

  render() {
    const { classes } = this.props;
    const avatar = require('../../assets/img/no-user-image.gif');
    const checkIcon = require('../../assets/img/check.png');
    const closeIcon = require('../../assets/img/close.png');
    const appStore = require('../../assets/img/png_icon_apple.png');
    const windowsStore = require('../../assets/img/png_icon_windows.png');
    const playStore = require('../../assets/img/png_icon_google.png');

    const { currentUser } = this.props.app;

    return (
      <div className={classes.root}>
        <Grid container>
          {/* change password text */}
          <Grid md={12}>
            <h1 className="userTwoFactor-heading">
              2-Factor-Authentication <span className="heading-2FA">2FA</span>{' '}
            </h1>
          </Grid>
          {/* userTwofactor left grid */}
          <Grid md={6} className="userTwoFactor-left-grid">
            <span className="enable2FA-note">
              Note: Enabling 2FA to secure your account is recommended
            </span>
            <div className="div-margin">
              <span className="statusText-span">Status:</span>
              <input
                type="checkbox"
                onChange={e => this.addPhone(e)}
                checked={currentUser ? (currentUser.phoneNumber ? true : false) : false}
              />
              <span className="status-span">
                Disabled <span className="lowSecurity-span">(Low Security)</span>
              </span>
            </div>
            <div className="div-margin">
              <FormGroup className="form-group">
                <span htmlFor="2FA-Secret" className="label">
                  {`2FA-Secret: `}
                </span>
                <input name="usernames" id="2FA-Secret" className="secret-Input-field" />
              </FormGroup>
            </div>
            {/* QR code div */}
            <div className="div-margin">
              <Button raised color="primary" className="generate-button">
                Generate New
              </Button>
              <div className="qr-div">
                <QRCode value="http://www.google.com/" />,
              </div>
            </div>
            {/* 2FA code div */}
            <div className="div-margin">
              <FormGroup className="form-group">
                <span htmlFor="2FA-Code" className="label">
                  {`Enter 2FA Code: `} <span className="fromApp-span">(From App)</span>
                </span>
                <input id="2FA-Code" className="code-Input-field" />
              </FormGroup>
            </div>
          </Grid>
          {/* userTwofactor right grid */}
          <Grid md={6} className="userTwoFactor-right-grid">
            <h1 className="enableInstruction-heading">How to Enable 2FA</h1>
            <div>
              {/* instruction list */}
              <ol>
                <li>
                  Download and Install{' '}
                  <span className="gogleAuthApp-text">Google Authenticator App</span>
                  <div>
                    <img src={appStore} alt="app-store-pic" />
                    <img src={playStore} alt="play-store-pic" />
                    <img src={windowsStore} alt="window-store-pic" />
                  </div>
                </li>
                <li>Generate a new 2FA secret key</li>
                <li>
                  Scan the generated QR code with the{' '}
                  <span className="gogleAuthApp-text">Google Authenticator App</span>
                </li>
                <li>Input the 2FA code from the app</li>
              </ol>
            </div>
          </Grid>
          <Grid className="twoFactor-button-grid">
            <Button raised color="primary" className="twoFactor-button">
              Enable 2FA
            </Button>
          </Grid>
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
    setCurrentUser: user => dispatch(actions.setCurrentUser(user))
  };
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(userTwoFactorStyle)(UserTwoFactor)
);
