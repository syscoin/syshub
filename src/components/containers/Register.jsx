import React, { Component } from 'react';
import swal from 'sweetalert';

import { fire } from '../../firebase';

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
        this.registerForm.reset();
      })
      .then(() => {
        const user = fire.auth().currentUser;

        if (user != null) {
          const usernameRef = fire.database().ref('usernames');
          usernameRef.child(username).set(user.uid);
          user
            .updateProfile({
              displayName: username
            })
            .then(() => {
              swal({
                title: 'Success',
                text: `Account ${user.email - user.displayName} created`,
                icon: 'success'
              });
            })
            .catch(err => {
              swal({
                title: 'Oops...',
                text: `${err}`,
                icon: 'error'
              });
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
    console.log(this.state.username);
    return (
      <div>
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
      </div>
    );
  }
}

export default Register;
