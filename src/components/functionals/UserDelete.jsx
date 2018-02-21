import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withStyles } from 'material-ui';
import { userDeleteStyle } from './styles';
import { Button, Grid } from 'material-ui';

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
              YOUR ACCOUNT INFORMATION WILL BE DELETED.
            </p>
            <p className="UserDelete-text">
              THIS ACTION CANNOT BE UNDONE.
            </p>
          </Grid>
          <Grid className="delete-button-grid">
            <Button
              onClick={this.props.onDeleteProfile}
              raised
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
  withStyles(userDeleteStyle)(UserDelete)
);
