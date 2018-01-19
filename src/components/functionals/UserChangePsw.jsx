import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userChangePswStyle } from './styles'
import { Button, Grid, FormGroup, Input, } from 'material-ui';
// import components
import { Stats, WelcomeBox } from '../functionals';

class UserChangePassword extends Component {

    render() {
        const { classes } = this.props;
        const avatar = require('../../assets/img/no-user-image.gif');
        const checkIcon = require('../../assets/img/check.png')
        const closeIcon = require('../../assets/img/close.png')
        return (
            <div className={classes.root}>
                <Grid container>
                    {/* change password text */}
                    <Grid md={12}>
                        <h1 className='changePsw-text'>Change Password</h1>
                    </Grid>
                    {/* profile credential grid */}
                    <Grid md={12} className='changePsw-credential-grid'>
                        <span className="changedPsw-note">Note: You will be redirected to login on successfull completion of password change</span>
                        {/* For User Name */}
                        <div className="formGroup-div">
                        <FormGroup className="form-group">
                            <span htmlFor="user-name" className="label">
                                {`Currrent Password: `}
                            </span>
                            <input
                                ref={input => (this.registerName = input)}
                                name="usernames"
                                id="user-name"
                                type="password"
                                className="input-field"
                                placeholder="******"
                            />
                        </FormGroup>

                        {/* For User Email */}
                        <FormGroup className="form-group">
                            <span htmlFor="user-email" className="label">
                                {`New Password: `}
                            </span>
                            <input
                                ref={input => (this.registerEmail = input)}
                                name="email"
                                id="user-name"
                                type="password"
                                className="input-field"
                                placeholder="******"
                            />
                            <span className="validation-message">
                                <img src={checkIcon} />
                                Password Strength
                            <span className="strong">Strong</span>
                            </span>
                        </FormGroup>
                        {/* For User Email */}
                        <FormGroup className="form-group">
                            <span htmlFor="user-email" className="label">
                                {`Confirm New Password: `}
                            </span>
                            <input
                                ref={input => (this.registerEmail = input)}
                                name="email"
                                type="password"
                                id="user-name"
                                className="input-field"
                                placeholder="******"
                            />
                        </FormGroup>
                        </div>
                    </Grid>
                    <Grid className="confirmChange-button-grid">
                        <Button raised color="primary" className="confirmChange-button" style={{color:'white'}}>Confirm Changes</Button>
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

export default connect(stateToProps, dispatchToProps)(withStyles(userChangePswStyle)(UserChangePassword))
