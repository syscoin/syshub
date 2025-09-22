import CryptoJS from "crypto-js";
import { payments } from "bitcoinjs-lib";
import { HDKey } from "@scure/bip32";
import { Buffer } from "buffer";
import { syscoinNetworks } from "./networks";
import { parseDescriptor } from "../components/profile/AddAddress/validation-utils";

/**
 * Hash password directly with SHA-256 to derive a fixed AES key
 */
const deriveKey = (pwd) => {
  return CryptoJS.SHA256(pwd).toString(); // SHA-256 hashed password as key
};

export const createSeed = (pwd) => {
  const derivedKey = deriveKey(pwd);
  window.localStorage.setItem("seed", derivedKey);
};

export const getSeed = () => {
  return window.localStorage.getItem("seed");
};

export const removeSeed = () => {
  return window.localStorage.removeItem("seed");
};

export const encryptVotingKey = (data) => {
  try {
    const { label, name, address, collateralIndex, type, ...otherProps } = data;

    const encryptedData = {
      label: data.label,
      name: data.name,
      address: data.address,
      collateralIndex: data.collateralIndex,
      type,
    };

    let derivedKey = getSeed();

    Object.entries(otherProps).forEach(([key, value]) => {
      if (key === "txId") {
        const [hash, index] = value.split("-");
        encryptedData[key] =
          CryptoJS.AES.encrypt(hash, derivedKey).toString() + "-" + index;
      } else if (key === "privateKey") {
        if (type === "descriptor") {
          // Derive the node matching the provided votingAddress from the descriptor wallet
          const network =
            process.env.REACT_APP_CHAIN_NETWORK === "main"
              ? syscoinNetworks.mainnet
              : syscoinNetworks.testnet;

          const { xprv } = parseDescriptor(value);
          const rootNode = HDKey.fromExtendedKey(xprv, network.bip32);
          const basePath = "m/84h/1h/0h/0/*".replaceAll("h", "'");
          const maxIndex = 100;
          let derivedNode = null;

          for (let i = 0; i < maxIndex; i++) {
            const fullPath = basePath.replace("*", i.toString());
            const node = rootNode.derive(fullPath);
            const pubkey = Buffer.from(node.publicKey);
            const { address: derivedAddress } = payments.p2wpkh({
              pubkey,
              network,
            });
            if (derivedAddress === address) {
              derivedNode = node;
              break;
            }
          }

          if (!derivedNode) {
            throw new Error(
              `Voting address ${address} does not belong to the provided descriptor wallet.`
            );
          }

          const privateKeyHex = Buffer.from(derivedNode.privateKey).toString(
            "hex"
          );
          encryptedData[key] = CryptoJS.AES.encrypt(
            privateKeyHex,
            derivedKey
          ).toString();
        } else {
          // Legacy: encrypt the provided WIF directly
          encryptedData[key] = CryptoJS.AES.encrypt(
            value,
            derivedKey
          ).toString();
        }
      } else {
        encryptedData[key] = CryptoJS.AES.encrypt(
          value.toString(),
          derivedKey
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
    let derivedKey = getSeed();
    Object.keys(data).forEach((item) => {
      if (item === "txId") {
        const collateralHash = data[item].slice(0, data[item].length - 2);
        const collateralIndex = data[item].charAt(data[item].length - 1);
        decryptedData[item] =
          CryptoJS.AES.decrypt(collateralHash, derivedKey).toString(
            CryptoJS.enc.Utf8
          ) +
          "-" +
          collateralIndex;
      } else if (item === "privateKey") {
        decryptedData[item] = CryptoJS.AES.decrypt(
          data[item],
          derivedKey
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
