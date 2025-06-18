import { HDKey } from "@scure/bip32";
import { bech32 } from "bech32";
import { sha256 } from "@noble/hashes/sha256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { hex } from "@scure/base";
const syscoinNetworks = {
  mainnet: {
    messagePrefix: "\x18Syscoin Signed Message:\n",
    bech32: "sys",
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x05,
    wif: 0x80,
  },
  testnet: {
    messagePrefix: "\x18Syscoin Signed Message:\n",
    bech32: "tsys",
    bip32: {
      public: 0x043587cf,
      private: 0x04358394,
    },
    pubKeyHash: 0x41,
    scriptHash: 0xc4,
    wif: 0xef,
  },
};

// Network prefix for mainnet (bc) or testnet (tb)
const HRP = syscoinNetworks.testnet.bech32; // 'tb' for testnet

// hash160 = RIPEMD160(SHA256(pubkey))
function hash160(pubkey) {
  return ripemd160(sha256(pubkey));
}

// Encode as bech32 address (P2WPKH)
function toBech32Address(pubkey) {
  const words = bech32.toWords(hash160(pubkey));
  words.unshift(0x00); // witness version 0
  return bech32.encode(HRP, words);
}

// Derive addresses from xprv
export function deriveAddressesFromXprv(xprv, path, count = 100) {
  const node = HDKey.fromExtendedKey(xprv, syscoinNetworks.testnet.bip32); // assumes mainnet

  const addresses = [];

  for (let i = 0; i < count; i++) {
    const child = node.derive(`m${path}/${i}`);
    const pubkey = child.publicKey;
    const address = toBech32Address(pubkey);
    addresses.push(address);
  }

  return addresses;
}

export function parseDescriptor(descriptor) {
  const cleaned = descriptor.split("#")[0];

  // Example match for: wpkh(tprv.../84h/1h/0h/0/*)
  const match = cleaned.match(/\((\w+)(\/.*)\/\*/);
  if (!match) return null;

  const xprv = match[1];
  const path = match[2].replace("/*", "").replaceAll("h", "'"); // we'll add index later

  return { xprv, path };
}
