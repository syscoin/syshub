import { HDKey } from "@scure/bip32";
import { bech32 } from "bech32";
import { sha256 } from "@noble/hashes/sha256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { hex } from "@scure/base";
import { syscoinNetworks } from "../../../utils/networks";


// Network prefix for mainnet (bc) or testnet (tb)
export const network =
      process.env.REACT_APP_CHAIN_NETWORK === "main"
        ? syscoinNetworks.mainnet
        : syscoinNetworks.testnet;

const HRP = network.bech32; // 'tb' for testnet

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
  const node = HDKey.fromExtendedKey(xprv, network.bip32); // assumes mainnet
  
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
