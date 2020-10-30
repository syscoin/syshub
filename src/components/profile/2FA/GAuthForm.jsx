import React from 'react'
import {getAuthQrCode} from '../../../utils/twoFaAuthentication'

export default function GAuthForm({GAuth}) {

  const {secret, gAuthSecret, qrCodeURL} = getAuthQrCode('thaymerapv@gmail.com');
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
