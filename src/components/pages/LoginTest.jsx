import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { connect } from 'react-redux';

import { fire } from '../../firebase';

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
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
          icon: 'success',
        });
        this.loginForm.reset();
      })
      .catch(err => {
        swal({
          title: 'Oops...',
          text: `${err}`,
          icon: 'error',
        });
      });
  }

  render() {
    return this.props.app.currentUser ? (
      <div>
        <p>
          <span>
            <strong>{`Uid: `}</strong>
            {`${this.props.app.currentUser.uid}`}
          </span>
          <br />
          <span>
            <strong>{`Name: `}</strong>
            {`${this.props.app.currentUser.displayName}`}
          </span>
          <br />
          <span>
            <strong>{`Email: `}</strong>
            {`${this.props.app.currentUser.email}`}
          </span>
        </p>
        <Logout />
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

const stateToProps = state => {
  return {
    app: state.app
  };
};

export default connect(stateToProps)(Login);
