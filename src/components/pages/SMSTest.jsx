import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import { fire } from '../../firebase';
import { warn } from '@firebase/database/dist/esm/src/core/util/util';

class SMSTest extends Component {
  constructor() {
    super();

    this.state = {
      appVerifier: null,
    };
    this.registerPhone = this.registerPhone.bind(this);
  }

  componentDidMount() {
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
  }

  registerPhone() {
    if (this.state.appVerifier != null) {
      fire
        .auth()
        .signInWithPhoneNumber('8123194206', this.state.appVerifier)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          alert(err);
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
        <p>Test Key Recap: {siteKeyRecap}</p>
        <p>Test Key Fire: {siteKeyFire}</p>
        <div id="recaptcha-container" style={{ height: '100px' }} />
        <button id="submitBtn" onClick={this.registerPhone}>
          SMS
        </button>
      </div>
    );
  }
}

export default SMSTest;
