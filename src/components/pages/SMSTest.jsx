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
    return (
      <div style={{ marginTop: '200px' }}>
        <h2>Auth</h2>
        SMS Test
        <Recaptcha
          style={{ marginLeft: '10px' }}
          id="captcha"
          sitekey="6LeNoEAUAAAAADaWqXweDPiSR-8HnWCQ3ZMrNp1o"
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
