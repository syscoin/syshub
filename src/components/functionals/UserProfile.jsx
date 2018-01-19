import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userProfileStyle } from './styles'
import { Button, Grid, FormGroup, Input, } from 'material-ui';
// import components
import { Stats, WelcomeBox } from '../functionals';

class UserProfile extends Component {
  render() {
    const { classes } = this.props;
    const avatar = require('../../assets/img/no-user-image.gif')
    return (
      <div className={classes.root}>
        <Grid container>
          {/* profile text */}
          <Grid md={12}>
            <h1 className='profile-text'>Profile</h1>
          </Grid>
          {/* profile image grid */}
          <Grid md={3} className="profile-image-grid">
            <div className="avatar-container">
              <img src={avatar} alt="no user image" className="user-image" />
            </div>
            <span className="changePhoto-span"><a className="link-color"> click to change photo</a></span>
          </Grid>
          {/* profile credential grid */}
          <Grid md={9} className='profile-credential-grid'>
            {/* For User Name */}
            <FormGroup className="form-group">
              <span htmlFor="user-name" className="label">
                {`Username: `}
              </span>
              <input
                ref={input => (this.registerName = input)}
                name="usernames"
                id="user-name"
                className="input-field"
                placeholder="Enter Username"
                onChange={e => this.checkUsername(e)}
              />
            </FormGroup>

            {/* For User Email */}
            <FormGroup className="form-group">
              <span htmlFor="user-email" className="label">
                {`Email: `}
              </span>
              <input
                ref={input => (this.registerEmail = input)}
                name="email"
                id="user-name"
                className="input-field"
                placeholder="Enter email"
              />
              <span className="validation-message">
                *required for password change
                </span>
            </FormGroup>

          </Grid>
          <Grid className="update-button-grid">
            <Button raised color="primary" className="update-button" innerTextColor="red">Update Profile</Button>
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

export default connect(stateToProps, dispatchToProps)(withStyles(userProfileStyle)(UserProfile))
