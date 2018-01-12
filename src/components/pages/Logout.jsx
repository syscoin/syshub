import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { fire } from '../../firebase';
import actions from '../../redux/actions';

class Logout extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    fire
      .auth()
      .signOut()
      .then(() => {
        if (this.props.app.currentUser !== null) {
          swal({
            title: 'success',
            text: 'Successfully logged out.',
            icon: 'success'
          });
          this.props.logout();
        }
      });
  }

  render() {
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
      </div>
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
    logout: () => dispatch(actions.logout())
  };
};

export default connect(stateToProps, dispatchToProps)(Logout);
