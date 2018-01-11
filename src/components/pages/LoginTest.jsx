import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { fire } from '../../firebase';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user,
        });
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
    const { currentUser } = this.props.app;
    return currentUser ? (
      <div>
        <p>
          <span>
            <strong>{`Uid: `}</strong>
            {`${currentUser.uid}`}
          </span>
          <br />
          <span>
            <strong>{`Name: `}</strong>
            {`${currentUser.displayName}`}
          </span>
          <br />
          <span>
            <strong>{`Email: `}</strong>
            {`${currentUser.email}`}
          </span>
        </p>
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
    app: state.app,
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(Login);
