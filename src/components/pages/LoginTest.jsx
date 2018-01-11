import React, { Component } from 'react';
import swal from 'sweetalert';

import { fire } from '../../firebase';
import { Logout } from '../pages';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user
        });
      }
    });
  }

  logout() {
    fire
      .auth()
      .signOut()
      .then(() => {
        if (this.state.currentUser !== null) {
          swal({
            title: 'success',
            text: 'Successfully logged out.',
            icon: 'success'
          });
          this.setState({ currentUser: null });
        }
      });
  }

  login(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        swal({
          title: 'Success',
          text: `Account: ${user.email} logged in.`,
          icon: 'success'
        });
        this.loginForm.reset();
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
    return this.state.currentUser ? (
      <div>
        <p>
          <span>
            <strong>{`Uid: `}</strong>
            {`${this.state.currentUser.uid}`}
          </span>
          <br />
          <span>
            <strong>{`Name: `}</strong>
            {`${this.state.currentUser.displayName}`}
          </span>
          <br />
          <span>
            <strong>{`Email: `}</strong>
            {`${this.state.currentUser.email}`}
          </span>
        </p>
        <Logout onLogout={this.logout} />
      </div>
    ) : (
      <div>
        <form
          onSubmit={event => {
            this.login(event);
          }}
          ref={form => {
            this.loginForm = form;
          }}
        >
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
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
