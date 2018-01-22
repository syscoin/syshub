import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { fire } from '../../firebase';
import actions from '../../redux/actions';

class UserTwoFactorTest extends Component {
  constructor(props) {
    super(props);

    this.addPhone = this.addPhone.bind(this);
    this.login = this.login.bind(this);
  }

  addPhone(event) {
    const user = fire.auth().currentUser;

    console.log(event.target.checked);
    if (event.target.checked) {
      swal({
        closeOnClickOutside: false,
        closeOnEsc: false,
        title: 'Add Phone Number',
        text: 'Please include your country code as well as area code as well.',
        icon: 'info',
        buttons: true,
        dangerMode: true,
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Provide Phone Number',
            type: 'number'
          }
        }
      }).then(value => {
        console.log(value);
        if (value) {
          user
            .updateProfile({ phoneNumber: '18123194206' })
            .then(() => {
              alert('success');
            })
            .catch(err => {
              alert(err);
            });
        }
      });
    }
  }

  login() {
    fire
      .auth()
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(() => {
        alert('success');
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    const { currentUser } = this.props.app;
    console.log(currentUser);
    return (
      <div style={{ marginTop: '200px' }}>
        <input
          type="checkbox"
          onChange={e => this.addPhone(e)}
          checked={currentUser ? (currentUser.phoneNumber ? true : false) : false}
        />
        <input ref={input => (this.email = input)} type="text" placeholder="email" />
        <input ref={input => (this.password = input)} type="text" placeholder="password" />
        <button onClick={this.login}>Login</button>
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
    setCurrentUser: user => dispatch(actions.setCurrentUser(user))
  };
};

export default connect(stateToProps, dispatchToProps)(UserTwoFactorTest);
