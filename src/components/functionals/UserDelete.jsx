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
          <Grid item md={12}>
            <h1 className="userDelete-heading">Delete Account</h1>
            <p className="UserDelete-text">
              YOUR ACCOUNT WILL BE DELETED COMPLETELY.
            </p>
            <p className="UserDelete-text">
              Your username will become available for registration and all your
              information will be remove from our database.
            </p>
            <p className="UserDelete-text"> THIS ACCTION CANNOT BE UNDONE</p>
            <p className="UserDelete-text">
              Kindly Send us feedback if you are unsatisfied
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
