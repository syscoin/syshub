import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import { fire } from '../../firebase';

class SMSTest extends Component {
  constructor() {
    super();

    this.registerPhone = this.registerPhone.bind(this);
  }

  comonentWillMount() {
    fire.auth().useDeviceLanguage();
  }

  registerPhone() {
    // fire
    //   .auth()
    //   .signInWithPhoneNumber(8123194206, appVerifier)
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });
  }

  render() {
    const siteKeyRecap = process.env.RECAPTCHA_SITE;
    const siteKeyFire = process.env.REACT_APP_FIREBASE_SENDER_ID;
    return (
      <div style={{ marginTop: '200px' }}>
        <h2>Auth</h2>
        <p>SMS Test</p>
        <p>Test Key Recap: {siteKeyRecap}</p>
        <p>Test Key Fire: {siteKeyFire}</p>
        <Recaptcha
          style={{ marginLeft: '10px' }}
          id="captcha"
          sitekey="6LfhnEEUAAAAACHqYj67uNQ89-4Z-ctwiOD1FRZ8"
          render="explicit"
          callback={value => {
            console.log(value);
          }}
        />
      </div>
    );
  }
}

export default SMSTest;
