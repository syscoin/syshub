import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui';
import { userProfileStyle } from './styles';
import { Button, Grid, FormGroup, Input } from 'material-ui';
import swal from 'sweetalert';
// import components
import { Stats, WelcomeBox } from '../functionals';
import { fire } from '../../firebase';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
    };

    this.submitProfile = this.submitProfile.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
  }

  submitProfile() {
    const username = this.registerName.value;
    const email = this.registerEmail.value;
    let updatedUser = {};
    updatedUser.username = username ? username : null;
    updatedUser.email = email ? email : null;

    this.props.onUpdateProfile(updatedUser);
    this.registerName.value = '';
    this.registerEmail.value = '';
  }

  checkUsername(event) {
    const username = this.registerName.value;
    if (event.target.value.match(/^[0-9a-zA-Z_ ]*$/) == null) {
      swal({
        title: 'Oops...',
        text: 'Must be an alphanumeric character',
        icon: 'warning',
      });

      return;
    }

    const usernameRef = fire.database().ref('usernames');
    if (event.target.value) {
      usernameRef.on('value', snapshot => {
        snapshot.forEach(snap => {
          if (snap.val() === username) {
            this.setState({
              disabled: true,
            });
            return;
          } else {
            this.setState({
              disabled: false,
            });
          }
        });
      });
    }
  }

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const avatar = require('../../assets/img/no-user-image.gif');
    return (
      <div className={style}>
        <Grid container>
          {/* profile text */}
          <Grid md={12}>
            <h1 className="profile-heading">Profile</h1>
          </Grid>
          {/* profile image grid */}
          <Grid md={3} className="profile-image-grid">
            <div className="avatar-container upload-image-container">
              {/* <input type="file"/> */}
              <img src={avatar} alt="no user image" className="user-image" />
            </div>
            <span className="change-photo-btn upload-image-container">
              {/* <input type="file"/> */}
              <a className="link-color"> click to change photo</a>
            </span>
          </Grid>
          {/* profile credential grid */}
          <Grid md={9} className="profile-credential-grid">
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
              />
              <span className="validation-message">
                {this.state.disabled === true ? 'Not Available' : 'Available'}
              </span>
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
            <Button
              onClick={this.submitProfile}
              raised
              color="primary"
              className="update-button"
              innerTextColor="red"
              disabled={this.state.disabled}
            >
              Update Profile
            </Button>
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

export default connect(stateToProps, dispatchToProps)(
  withStyles(userProfileStyle)(UserProfile)
);
