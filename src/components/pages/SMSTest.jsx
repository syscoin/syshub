import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
import swal from 'sweetalert';

import { fire } from '../../firebase';
import { warn } from '@firebase/database/dist/esm/src/core/util/util';

class SMSTest extends Component {
  constructor() {
    super();

<<<<<<< HEAD
=======
    this.state = {
      appVerifier: null,
    };
>>>>>>> e55fcddef2f2207d394b9845725c16bfa1b891f2
    this.registerPhone = this.registerPhone.bind(this);
  }

  componentDidMount() {
<<<<<<< HEAD
    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(this.recaptcha);

    window.recaptchaVerifier.render().then(function(widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }

  comonentWillMount() {
    fire.auth().useDeviceLanguage();
=======
    /* fire.auth().useDeviceLanguage(); */
    const reCaptchaCont = document.getElementById('submitBtn');
    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(reCaptchaCont, {
      size: 'invisible',
      callback: function(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        alert(response);
      },
      'expired-callback': function() {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      },
    });
    console.log('ACZ (window) --> ', window);
    console.log('ACZ (this) --> ', this);
>>>>>>> e55fcddef2f2207d394b9845725c16bfa1b891f2
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
<<<<<<< HEAD
        <input ref={input => (this.phoneInput = input)} type="tel" />
        <div ref={ref => (this.recaptcha = ref)} />
        <button onClick={this.registerPhone}>SMS</button>
=======
        <p>Test Key Recap: {siteKeyRecap}</p>
        <p>Test Key Fire: {siteKeyFire}</p>
        <div id="recaptcha-container" style={{ height: '100px' }} />
        <button id="submitBtn" onClick={this.registerPhone}>
          SMS
        </button>
>>>>>>> e55fcddef2f2207d394b9845725c16bfa1b891f2
      </div>
    );
  }
}

export default SMSTest;
