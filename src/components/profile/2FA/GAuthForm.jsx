import React from 'react';

import { getAuthQrCode } from '../../../utils/twoFaAuthentication';

import {useUser} from "../../../context/user-context";


export default function GAuthForm({ GAuth }) {
  const { user } = useUser();
  console.log(user);

  const {secret, gAuthSecret, qrCodeURL} = getAuthQrCode(user.email);
  console.log(secret)

  console.log(gAuthSecret)

  return (
    <>
      <h3>Google Authenticator</h3>
      <div className="input-form">
        <img src={qrCodeURL} alt=""/>
      </div>
    </>
  )
}
