const CryptoJS = require('crypto-js');

export const encryptAes = (data) => {
  try {
    console.log(`${process.env.REACT_APP_ENCRYPT_KEY_DATA}`)
    let encryptedMessage = CryptoJS.AES.encrypt(data.toString('hex'), process.env.REACT_APP_ENCRYPT_KEY_DATA);
    return encryptedMessage.toString();
  } catch (err) {
    throw err;
  }
}

export const decryptAes = (data) => {
  try {
    let decryptedBytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY_DATA);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    throw err;
  }
}
