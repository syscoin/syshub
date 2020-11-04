import speakeasy from 'speakeasy';
import qrCode from 'qrcode';

export const getAuthQrCode = email => {
  const secretObj = speakeasy.generateSecret();
  const secret = secretObj.base32;
  let qrCodeURL;
  let url = speakeasy.otpauthURL({algorithm: 'sha1', issuer: 'Syshub', secret: secret, label: email});
  const gAuthSecret = url.split('secret=')[1].split('&issuer=')[0];
  qrCode.toDataURL(url, (err, data_url) => (qrCodeURL = data_url));
  return {secret, gAuthSecret, qrCodeURL};
}
export const generateToken = secret => speakeasy.totp({secret: secret, encoding: ['base32']});

export const verifyAuthCode = (secret, token) => speakeasy.totp.verify({secret: secret, token});
