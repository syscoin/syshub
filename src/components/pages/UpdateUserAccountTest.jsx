import React, { Component } from 'react';
import swal from 'sweetalert';

class UpdateUserAccountTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        email: ''
      }
    };

    this.updateUser = this.updateUser.bind(this);
    this.submitUserAccount = this.submitUserAccount.bind(this);
  }

  updateUser(event) {
    event.preventDefault();

    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  }

  submitUserAccount() {
    if (this.state.user.username.match(/^[0-9a-zA-Z_ ]*$/) == null) {
      swal({
        title: 'Oops...',
        text: 'Must be an alphanumeric character',
        icon: 'warning'
      });

      this.setState({
        user: { ...this.state.user, username: '' }
      });
      return;
    }

    this.setState({
      user: { ...this.state.user, username: '', email: '' }
    });

    this.props.onUpdateProfile(this.state.user);
  }

  render() {
    const { username, email } = this.state.user;
    return (
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={e => this.updateUser(e)}
          value={email}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={e => this.updateUser(e)}
          value={username}
        />

        <button onClick={this.submitUserAccount}>Update Account</button>
      </div>
    );
  }
}

export default UpdateUserAccountTest;
