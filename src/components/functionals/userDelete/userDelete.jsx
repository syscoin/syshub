import React, { Component } from 'react';

import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Button, Grid } from '@material-ui/core';

// Import Style Sheets
import userDeleteStyle from './userDelete.style';

class UserDelete extends Component {
  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;
    return (
      <div className={style}>
        <Grid container>
          {/* change password text */}
          <Grid item md={12} xs={12}>
            <h1 className="userDelete-heading">Delete Account</h1>
            <p className="UserDelete-text">
              Your account information will be deteled.
            </p>
            <p className="UserDelete-text">
              This action can not be undone.
            </p>
          </Grid>
          <Grid className="delete-button-grid">
            <Button
              onClick={this.props.onDeleteProfile}
              variant= "raised"
              color="primary"
              className="delete-button"
            >
              Delete Account
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
  injectSheet(userDeleteStyle)(UserDelete)
);
