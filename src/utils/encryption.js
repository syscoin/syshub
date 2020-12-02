const CryptoJS = require('crypto-js');

/**
 * used to encrypt data
 * @function
 * @param {*} data data to encrypt
 */
export const encryptAes = (data) => {
  try {
    let encryptedMessage = CryptoJS.AES.encrypt(data.toString('hex'), process.env.REACT_APP_ENCRYPT_KEY_DATA);
    return encryptedMessage.toString();
  } catch (err) {
    throw err;
  }
}

/**
 * used to decrypt data
 * @function
 * @param {*} data data to decrypt
 */
export const decryptAes = (data) => {
  try {
    let decryptedBytes = CryptoJS.AES.decrypt(data, process.env.REACT_APP_ENCRYPT_KEY_DATA);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    throw err;
  }
}
