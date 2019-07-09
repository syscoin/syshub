import React, { Component } from 'react';

import { connect } from 'react-redux';
//import actions from '../../../redux/actions';
import injectSheet from 'react-jss';

// Import material-ui components
import Grid from '@material-ui/core/Grid';

// Import Custom components
import UserTwoFactorSMS from '../userTwoFactorSMS/userTwoFactorSMS';
import UserTwoFactorAuth from '../userTwoFactorAuth/userTwoFactorAuth';

// Import Style
import userTwoFactorStyle from './userTwoFactor.style';

class UserTwoFactor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: null,
      isoCode: 'US',
      editNumber: false
    };
  }

  componentDidMount() {}

  render() {
    const { classes, deviceType } = this.props;
    //Platform style switcher
    const style = deviceType === 'mobile' ? classes.mRoot : classes.root;

    //const { currentUser } = this.props.app;

    return (
      <Grid container className={style} spacing={16}>
        <Grid item md={12} className="heading-grid">
          <h1 className="heading-2FA">2-Factor-Authentication</h1>
          <div className="heading2FA-note">
            Note: Enabling 2FA is REQUIRED to vote on proposals. You can only
            use one (1) 2FA method. Please choose SMS or Google Authenticator.
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            className="content2FA"
            justify="flex-start"
            spacing={40}
          >
            <Grid item className="content2FA-left">
              <UserTwoFactorSMS />
            </Grid>
            <Grid item>
              <div className="vDivider" />
            </Grid>
            <Grid item className="content2FA-right">
              <UserTwoFactorAuth />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const stateToProps = state => {
  return {
    app: state.app
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectSheet(userTwoFactorStyle)(UserTwoFactor));
