import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import { fire } from '../../firebase';

class SMSTest extends Component {
  constructor() {
    super();

    this.state = {
      appVerifier: null
    };

    this.registerPhone = this.registerPhone.bind(this);
  }

  comonentWillMount() {
    fire.auth().useDeviceLanguage();
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
        <div id="recaptcha-container" />
        <button onClick={this.registerPhone}>SMS</button>
      </div>
    );
  }
}

export default SMSTest;
