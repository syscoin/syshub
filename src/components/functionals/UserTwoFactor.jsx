import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userTwoFactorStyle } from './styles'
import { Button, Grid, FormGroup, Input, } from 'material-ui';
// import components
import { Stats, WelcomeBox } from '../functionals';


import QRCode  from 'qrcode.react';
class UserTwoFactor extends Component {

    render() {
        const { classes } = this.props;
        const avatar = require('../../assets/img/no-user-image.gif');
        const checkIcon = require('../../assets/img/check.png')
        const closeIcon = require('../../assets/img/close.png')
        const appStore = require('../../assets/img/png_icon_apple.png')
        const windowsStore = require('../../assets/img/png_icon_windows.png')
        const playStore = require('../../assets/img/png_icon_google.png')
        
        return (
            <div className={classes.root}>
                <Grid container>
                    {/* change password text */}
                    <Grid md={12}>
                        <h1 className='userTwoFactor-heading'>2-Factor-Authentication <span className="heading-2FA">2FA</span> </h1>
                    </Grid>
                    {/* userTwofactor left grid */}
                    <Grid md={6} className='userTwoFactor-left-grid'>
                        <span className="enable2FA-note">Note: Enabling 2FA to secure your account is recommended</span>
                        <div className='div-margin'>
                            <span className="statusText-span">Status:</span>
                            <span className="status-span">Disabled <span className='lowSecurity-span'>(Low Security)</span></span>
                        </div>
                        <div className='div-margin'>
                            <FormGroup className="form-group">
                                <span htmlFor="2FA-Secret" className="label">
                                    {`2FA-Secret: `}
                                </span>
                                <input
                                    name="usernames"
                                    id="2FA-Secret"
                                    className="secret-Input-field"
                                />
                            </FormGroup>
                        </div>
                        {/* QR code div */}
                        <div className='div-margin'>
                            <Button raised className="generate-button">Generate New</Button>
                           <div className="qr-div">
                            <QRCode value="http://www.google.com/" />,                               
                           </div>
                            </div>
                        {/* 2FA code div */}
                        <div className='div-margin'>
                            <FormGroup className="form-group">
                                <span htmlFor="2FA-Code" className="label">
                                    {`Enter 2FA Code: `} <span className="fromApp-span">(From App)</span>
                                </span>
                                <input
                                    id="2FA-Code"
                                    className="code-Input-field"
                                />
                            </FormGroup>
                        </div>


                    </Grid>
                    {/* userTwofactor right grid */}
                    <Grid md={6} className='userTwoFactor-right-grid'>
                        <h1 className='enableInstruction-heading'>How to Enable 2FA</h1>
                        <div>
                            {/* instruction list */}
                            <ol>
                                <li>Download and Install <span className="googleAuthApp-text">Google Authenticator App</span>
                                <div>
                                    <img src={appStore} alt="app-store-pic"/>
                                    <img src={playStore} alt="play-store-pic"/>
                                    <img src={windowsStore} alt="window-store-pic"/>                                    
                                </div>
                                </li>
                                <li>Generate a new 2FA secret key</li>
                                <li>Scan the generated QR code with the <span className="googleAuthApp-text">Google Authenticator App</span></li>
                                <li>Input the 2FA code from the app</li>
                            </ol>
                        </div>
                    </Grid>
                    <Grid className="twoFactor-button-grid">
                        <Button raised className="twoFactor-button">Enable 2FA</Button>
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

export default connect(stateToProps, dispatchToProps)(withStyles(userTwoFactorStyle)(UserTwoFactor))
