import React, { Component } from 'react';
import swal from 'sweetalert';

class UpdateUserPasswordTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        currentPass: '',
        newPass: '',
        confirmNewPass: ''
      },
      match: null
    };

    this.updatePassword = this.updatePassword.bind(this);
    this.submitUserPassword = this.submitUserPassword.bind(this);
  }

  updatePassword(event) {
    event.preventDefault();

    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });

    if (this.newPass.value === this.confirmNewPass.value) {
      this.setState({
        match: true
      });
    } else if (this.newPass.value !== this.confirmNewPass.value) {
      this.setState({
        match: false
      });
    }
  }

  submitUserPassword() {
    if (this.newPass.value !== this.confirmNewPass.value) {
      swal({
        title: 'Oops...',
        text: 'Passwords must match',
        icon: 'error'
      });

      return;
    }

    this.setState({
      user: {
        ...this.state.user,
        currentPass: '',
        newPass: '',
        confirmNewPass: ''
      },
      match: null
    });

    this.props.onUpdatePassword(this.state.user);
  }

  render() {
    const { currentPass, newPass, confirmNewPass } = this.state.user;
    return (
      <div>
        <input
          type="password"
          name="currentPass"
          placeholder="Current Password"
          onChange={e => this.updatePassword(e)}
          value={currentPass}
        />
        <input
          type="password"
          name="newPass"
          placeholder="New Password"
          onChange={e => this.updatePassword(e)}
          value={newPass}
          ref={input => {
            this.newPass = input;
          }}
        />
        <input
          type="password"
          name="confirmNewPass"
          placeholder="Confirm New Password"
          onChange={e => this.updatePassword(e)}
          value={confirmNewPass}
          ref={input => {
            this.confirmNewPass = input;
          }}
        />
        <button disabled={!this.state.match} onClick={this.submitUserPassword}>
          Update Pasword
        </button>
        {this.state.match !== null ? (
          this.state.match === false ? (
            <div style={{ color: 'red' }}>Passwords Must Match</div>
          ) : (
            <div style={{ color: 'green' }}>Passwords Match!</div>
          )
        ) : null}
      </div>
    );
  }
}

export default UpdateUserPasswordTest;
