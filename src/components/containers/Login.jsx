import React, { Component } from 'react';
import swal from 'sweetalert';

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
          icon: 'success'
        });
        this.loginForm.reset();
      })
      .catch(err => {
        swal({
          title: 'Oops...',
          text: err,
          icon: 'error'
        });
      });
  }

  render() {
    return (
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
    );
  }
}

export default Login;
