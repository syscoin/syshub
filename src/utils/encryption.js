import CryptoJS from 'crypto-js';

export const encryptAes = (data) => {
  try {
    let encryptedMessage = CryptoJS.AES.encrypt(data.toString('hex'), process.env.ENCRYPT_KEY_DATA);
    return encryptedMessage.toString();
  } catch (err) {
    throw err;
  }
}

export const decryptAes = (data) => {
  try {
    let decryptedBytes = CryptoJS.AES.decrypt(data, process.env.ENCRYPT_KEY_DATA);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    throw err;
  }
}
