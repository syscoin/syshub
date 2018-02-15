import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from 'material-ui';
import { userProfileStyle } from './styles';
import { Button, Grid, FormGroup } from 'material-ui';
import swal from 'sweetalert';
import { Input } from 'antd';
// import components
import { fire } from '../../API/firebase';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      image: null,
      imageFile: null
    };

    this.submitProfile = this.submitProfile.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
  }

  submitProfile() {
    const username = this.registerName.value;
    const email = this.registerEmail.value;
    const image = this.state.imageFile;
    let updatedUser = {};
    updatedUser.username = username ? username : null;
    updatedUser.email = email ? email : null;

    if (email || username || image) {
      if (image != null) {
        const fileName = this.state.imageFile.name;
        const file = this.state.imageFile;
        const uploadTask = fire
          .storage()
          .ref('/avatars/' + fileName)
          .put(file);

        uploadTask.on(
          'state_changed',
          function (snapshot) {
            const progress =
              snapshot.bytesTransferred / snapshot.totalBytes * 100;
          },
          function (error) {
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                alert('Permission denied');
                break;

              case 'storage/canceled':
                // User canceled the upload
                alert('User canceled the upload');
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                alert('Unknown error occurred');
                break;
              default:
                break;

            }
          },
          () => {
            const downloadURL = uploadTask.snapshot.downloadURL;
            updatedUser.photoURL = downloadURL;
            this.props.onUpdateProfile(updatedUser);
            this.registerName.value = '';
            this.registerEmail.value = '';
          }
        );

        return;
      }
      this.props.onUpdateProfile(updatedUser);
      this.registerName.value = '';
      this.registerEmail.value = '';
    }
  }

  checkUsername(event) {
    const username = this.registerName.value;
    if (event.target.value.match(/^[0-9a-zA-Z_ ]*$/) == null) {
      swal({
        title: 'Oops...',
        text: 'Must be an alphanumeric character',
        icon: 'warning'
      });

      return;
    }

    const usernameRef = fire.database().ref('usernames');
    if (event.target.value) {
      usernameRef.on('value', snapshot => {
        snapshot.forEach(snap => {
          if (snap.val() === username) {
            this.setState({
              disabled: true
            });
            return;
          } else {
            this.setState({
              disabled: false
            });
          }
        });
      });
    }
  }
  // upload profile image function
  onImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ image: e.target.result, imageFile: file });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    const avatar = this.props.currentUser && this.props.currentUser.photoURL ? this.props.currentUser.photoURL : require('../../assets/img/no-user-image.gif');
    return (
      <div className={style}>
        <Grid container className="profile-grid">
          {/* profile text */}
          <Grid item md={12}>
            <h1 className="profile-heading">Profile</h1>
          </Grid>

          {/* profile image grid */}
          <Grid md={3} item className="profile-image-grid">
            <div className="avatar-container upload-image-container">
              {this.state.image === null ? (
                <img src={avatar} alt="no user" className="user-image" />
              ) : (
                  <img
                    src={this.state.image}
                    alt="no user"
                    className="user-image"
                  />
                )}
            </div>
            <span className="change-photo-btn upload-image-container">
              <Input
                type="file"
                onChange={this.onImageChange.bind(this)}
                className="filetype"
                id="group_image"
              />
              <a className="link-color"> click to change photo</a>
            </span>
          </Grid>

          {/* profile credential grid */}
          <Grid md={9} item className="profile-credential-grid">
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
  return {
    currentUser: state.app.currentUser
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(
  withStyles(userProfileStyle)(UserProfile)
);
