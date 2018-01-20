import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import swal from 'sweetalert';

import { fire } from '../../firebase';

class SMSTest extends Component {
  constructor() {
    super();

    this.registerPhone = this.registerPhone.bind(this);
  }

  componentDidMount() {
    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha);

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }

  comonentWillMount() {
    fire.auth().useDeviceLanguage();
  }

  registerPhone() {
    const appVerifier = window.recaptchaVerifier;
    const userPhone = this.phoneInput.value;

    if (userPhone.length !== 10) {
      alert('Please include area code as well as your 7 digit phone number');
    }

    if (appVerifier && userPhone) {
      fire
        .auth()
        .signInWithPhoneNumber(`+${userPhone}`, appVerifier)
        .then(confirmResult => {
          return confirmResult;
        })
        .then(confirmResult => {
          return swal({
            closeOnClickOutside: false,
            closeOnEsc: false,
            title: 'Success',
            text: 'Please provide use the verification code to continue',
            icon: 'success',
            buttons: true,
            dangerMode: false,
            content: {
              element: 'input',
              attributes: {
                placeholder: 'Confirmation code here',
                type: 'text'
              }
            }
          })
            .then(code => {
              if (code) {
                return confirmResult.confirm(code);
              }
            })
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              swal({ title: 'Error', text: `${err}`, icon: 'error' });
            });
        })
        .catch(err => {
          swal({ title: 'Error', text: `${err}`, icon: 'error' });
        });
    }
  }

  callback() {}

  render() {
    const siteKeyRecap = process.env.RECAPTCHA_SITE;
    const siteKeyFire = process.env.REACT_APP_FIREBASE_SENDER_ID;

    return (
      <div style={{ marginTop: '200px' }}>
        <h2>Auth</h2>
        <p>SMS Test</p>
        <input ref={input => (this.phoneInput = input)} type="tel" />
        <div ref={ref => (this.recaptcha = ref)} />
        <button onClick={this.registerPhone}>SMS</button>
      </div>
    );
  }
}

export default SMSTest;
