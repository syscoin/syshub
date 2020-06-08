const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

export const getAuthQRCode = email => {
  const secretObj = speakeasy.generateSecret();
  const secret = secretObj.base32;
  let qrCodeURL;
  let url = speakeasy.otpauthURL({
    algorithm: 'sha1',
    issuer: 'Syshub',
    secret: secret,
    label: email
  });
  const gAuthSecret = url.split('secret=')[1].split('&issuer=')[0];

  QRCode.toDataURL(url, (err, data_url) => (qrCodeURL = data_url));
  return { secret, gAuthSecret, qrCodeURL };
};

export const generateToken = secret =>
  speakeasy.totp({
    secret: secret,
    encoding: ['base32']
  });

export const verifyAuthCode = (secret, token) => {
  const verified = speakeasy.totp.verify({
    secret: secret,
    encoding: ['base32'],
    token
  });
  return verified;
};
