import React, { Component } from 'react';
import { connect } from 'react-redux';

import { doLogin } from '../../firebase';

class Login extends Component {
  login(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    doLogin(email, password);
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
      </div>
    ) : (
      <div>
        <form
          onSubmit={event => this.login(event)}
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
    app: state.app,
  };
};

export default connect(stateToProps)(Login);
