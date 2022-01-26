import speakeasy from 'speakeasy';
import qrCode from 'qrcode';

/**
 * function that generates the secret, gauthsecret and the url  of the qrcode
 * @function
 * @param {string} email email wich is being used to generate the qr and the secret
 * @returns {Object} it returns the secret, gauthsecret and the url  of the qrcode
 */
export const getAuthQrCode = email => {
  const secretObj = speakeasy.generateSecret();
  const secret = secretObj.base32;
  let qrCodeURL;
  let url = speakeasy.otpauthURL({algorithm: 'sha1', issuer: 'Syshub', secret: secret, label: email});
  const gAuthSecret = url.split('secret=')[1].split('&issuer=')[0];
  qrCode.toDataURL(url, (err, data_url) => (qrCodeURL = data_url));
  return {secret, gAuthSecret, qrCodeURL};
}

/**
 * generates a single use token of verification
 * @function
 * @param {string} secret the gauth secret used to generate the token
 */
export const generateToken = secret => speakeasy.totp({secret: secret, encoding: ['base32']});

/**
 * verifies the token with the secret to use google authenticator as 2fa
 * @function
 * @param {string} secret the secret used to verify
 * @param {string} token the token used to verify 
 */
export const verifyAuthCode = (secret, token) => speakeasy.totp.verify({secret: secret, token});

// export const verifyAuthCode = (secret, token) => {
//
//   return speakeasy.time.verify({
//     secret: secret,
//     token: token,
//     encoding: ['base32'],
//     step: 600
//   })
// }
