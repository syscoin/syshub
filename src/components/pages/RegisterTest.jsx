import React, { Component } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';

import { fire } from '../../firebase';
import actions from '../../redux/actions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.state = {
      disabled: false,
      username: null
    };
  }

  componentDidMount() {}

  updateUsername(event) {
    if (event.target.value.match(/^[0-9a-zA-Z_ ]*$/) == null) {
      swal({
        title: 'Oops...',
        text: 'Must be an alphanumeric character',
        icon: 'warning'
      });

      this.registerForm.reset();
      return;
    }

    this.setState({
      [event.target.name]: event.target.value
    });

    const usernameRef = fire.database().ref('usernames');
    if (event.target.value) {
      usernameRef.child(event.target.value).on('value', snap => {
        if (snap.val() != null) {
          this.setState({
            disabled: true
          });
        } else if (snap.val() == null) {
          this.setState({
            disabled: false
          });
        }
      });
    }
  }

  register(event) {
    event.preventDefault();
    this.setState({
      username: ''
    });
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const username = this.usernameInput.value;

    if (!username) {
      swal({
        title: 'Oops...',
        text: 'Must provide a username',
        icon: 'error'
      });

      return;
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        const currentUser = fire.auth().currentUser;

        if (user.uid === currentUser.uid) {
          const usernameRef = fire.database().ref('usernames');
          usernameRef.child(username).set(user.uid);
          currentUser.updateProfile({ displayName: username });

          this.registerForm.reset();
          swal({
            title: 'Success',
            text: `Account ${currentUser.email} created`,
            icon: 'success'
          });
        }
      })
      .catch(err => {
        swal({
          title: 'Oops...',
          text: `${err}`,
          icon: 'error'
        });
      });
  }

  render() {
    const { currentUser } = this.props.app;
    return (
      <div>
        {currentUser ? null : (
          <form
            onSubmit={event => {
              this.register(event);
            }}
            ref={form => {
              this.registerForm = form;
            }}
          >
            <input
              name="username"
              type="text"
              placeholder="Username"
              ref={input => {
                this.usernameInput = input;
              }}
              onChange={e => this.updateUsername(e)}
              value={this.state.username}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              ref={input => {
                this.emailInput = input;
              }}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              ref={input => {
                this.passwordInput = input;
              }}
            />
            <button type="submit" disabled={this.state.disabled}>
              Register
            </button>

            <div style={this.state.disabled ? { color: 'red' } : null}>
              {this.state.username}
              {this.state.username != null
                ? this.state.username.length > 0
                  ? this.state.disabled ? '- Taken' : '- Not Taken'
                  : null
                : null}
            </div>
          </form>
        )}
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
    currentUser: user => dispatch(actions.currentUser(user))
  };
};

export default connect(stateToProps, dispatchToProps)(Register);
