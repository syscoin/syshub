import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';

// Import provider HOC's
import { compose } from 'recompose';
import { withFirebase } from '../../../providers/firebase';

// Import libs components
import Grid from '@material-ui/core/Grid';
import swal from 'sweetalert';

// Import Custom components
import UserTwoFactorSMS from '../userTwoFactorSMS/userTwoFactorSMS';
import UserTwoFactorAuth from '../userTwoFactorAuth/userTwoFactorAuth';

// Import Style
import injectSheet from 'react-jss';
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

  // add Firebase as global var in component
  firebase = this.props.firebase;

  componentDidMount() {}

  TwoFAStatusChange(modalTitle) {
    swal({
      title: modalTitle,
      text: 'Please login again',
      icon: 'success'
    }).then(() => {
      this.firebase.doLogout(() => {
        this.props.doAppLogout('login');
      });
    });
  }

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
              <UserTwoFactorSMS
                onStatusChange={msg => this.TwoFAStatusChange(msg)}
              />
            </Grid>
            <Grid item>
              <div className="vDivider" />
            </Grid>
            <Grid item className="content2FA-right">
              <UserTwoFactorAuth
                onStatusChange={msg => this.TwoFAStatusChange(msg)}
              />
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
  return {
    doAppLogout: goTo => dispatch(actions.doLogout(goTo)),
    setPage: page => dispatch(actions.setPage(page))
  };
};

export default compose(
  withFirebase,
  connect(
    stateToProps,
    dispatchToProps
  ),
  injectSheet(userTwoFactorStyle)
)(UserTwoFactor);
