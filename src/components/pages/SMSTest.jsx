import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import swal from 'sweetalert';

import { fire } from '../../firebase';
import { warn } from '@firebase/database/dist/esm/src/core/util/util';

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

    if (userPhone.length === 0) {
      alert('Please include a phone number to recieve sms notification');
    }

    fire
      .auth()
      .signInWithPhoneNumber(`+${userPhone}`, appVerifier)
      .then(function(confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log(confirmationResult);
        return confirmationResult;
      })
      .then(confirmResult => {
        swal({
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
          .then(value => {
            return confirmResult.confirm(value);
          })
          .then(result => {
            return fire.auth().signOut();
          })
          .then(() => {
            const email = this.email.value;
            const password = this.password.value;

            return fire.auth().signInWithEmailAndPassword(email, password);
          })
          .then(user => {
            swal({
              title: 'Sucess',
              text: `${user.email} signed in with sms verification`,
              icon: 'success'
            });
          })
          .catch(err => {
            swal({ title: 'Oops...', text: `${err}`, icon: 'error' });
          });
      })
      .catch(function(error) {
        swal({ title: 'Oops...', text: `${error}`, icon: 'error' });
      });
  }

  render() {
    const siteKeyRecap = process.env.RECAPTCHA_SITE;
    const siteKeyFire = process.env.REACT_APP_FIREBASE_SENDER_ID;
    return (
      <div style={{ marginTop: '200px' }}>
        <h2>Auth</h2>
        <p>SMS Test</p>
        <input ref={input => (this.email = input)} type="text" placeholder="Email" />
        <input ref={input => (this.password = input)} type="text" placeholder="Password" />
        <input ref={input => (this.phoneInput = input)} type="tel" />
        <div ref={ref => (this.recaptcha = ref)} />
        <button onClick={this.registerPhone}>SMS</button>
      </div>
    );
  }
}

export default SMSTest;
