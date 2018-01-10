import React, { Component } from 'react';
import swal from 'sweetalert';

import { fire } from '../../firebase';

class Register extends Component {
  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
  }

  register(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        swal({
          title: 'Success',
          text: `Account: ${user.email} created.`,
          icon: 'success'
        });
        this.registerForm.reset();
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
          this.register(event);
        }}
        ref={form => {
          this.registerForm = form;
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
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default Register;
