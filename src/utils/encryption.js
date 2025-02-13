const CryptoJS = require("crypto-js");

export const createSeed = (pwd) => {
  window.localStorage.setItem(
    "seed",
    CryptoJS.AES.encrypt(pwd, process.env.REACT_APP_ENCRYPT_KEY_DATA).toString()
  );
};

export const getSeed = () => window.localStorage.getItem("seed");

export const removeSeed = () => window.localStorage.removeItem("seed");

export const encryptVotingKey = (data) => {
  try {
    let encryptedData = {};
    let pwd = getSeed();
    Object.keys(data).forEach((item) => {
      if (
        item === "label" ||
        item === "name" ||
        item === "votingAddress" ||
        item === "address" ||
        item === "collateralIndex"
      ) {
        encryptedData[item] = data[item];
      } else if (item === "txId") {
        encryptedData[item] =
          CryptoJS.AES.encrypt(
            data[item].split("-")[0].toString(),
            `${CryptoJS.AES.decrypt(
              pwd,
              process.env.REACT_APP_ENCRYPT_KEY_DATA
            ).toString(CryptoJS.enc.Utf8)}${
              process.env.REACT_APP_ENCRYPT_KEY_DATA
            }`
          ).toString() +
          "-" +
          data[item].split("-")[1];
      } else {
        encryptedData[item] = CryptoJS.AES.encrypt(
          data[item].toString(),
          `${CryptoJS.AES.decrypt(
            pwd,
            process.env.REACT_APP_ENCRYPT_KEY_DATA
          ).toString(CryptoJS.enc.Utf8)}${
            process.env.REACT_APP_ENCRYPT_KEY_DATA
          }`
        ).toString();
      }
    });
    return encryptedData;
  } catch (err) {
    throw err;
  }
};

export const decryptVotingKey = (data) => {
  try {
    let decryptedData = {};
    let pwd = getSeed();
    Object.keys(data).forEach((item) => {
      if (item === "txId") {
        const collateralHash = data[item].slice(0, data[item].length - 2);
        const collateralIndex = data[item].charAt(data[item].length - 1);
        decryptedData[item] =
          CryptoJS.AES.decrypt(
            collateralHash,
            `${CryptoJS.AES.decrypt(
              pwd,
              process.env.REACT_APP_ENCRYPT_KEY_DATA
            ).toString(CryptoJS.enc.Utf8)}${
              process.env.REACT_APP_ENCRYPT_KEY_DATA
            }`
          ).toString(CryptoJS.enc.Utf8) +
          "-" +
          collateralIndex;
      } else if (item === "privateKey") {
        decryptedData[item] = CryptoJS.AES.decrypt(
          data[item],
          `${CryptoJS.AES.decrypt(
            pwd,
            process.env.REACT_APP_ENCRYPT_KEY_DATA
          ).toString(CryptoJS.enc.Utf8)}${
            process.env.REACT_APP_ENCRYPT_KEY_DATA
          }`
        ).toString(CryptoJS.enc.Utf8);
      } else {
        decryptedData[item] = data[item];
      }
    });
    return decryptedData;
  } catch (err) {
    throw err;
  }
};

/**
 * used to encrypt data
 * @function
 * @param {*} data data to encrypt
 */
export const encryptJWT = (data) => {
  try {
    let encryptedMessage = CryptoJS.AES.encrypt(
      data.toString("hex"),
      process.env.REACT_APP_ENCRYPT_KEY_DATA
    );
    return encryptedMessage.toString();
  } catch (err) {
    throw err;
  }
};

/**
 * used to decrypt data
 * @function
 * @param {*} data data to decrypt
 */
export const decryptJWT = (data) => {
  try {
    let decryptedBytes = CryptoJS.AES.decrypt(
      data,
      process.env.REACT_APP_ENCRYPT_KEY_DATA
    );
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    throw err;
  }
};
