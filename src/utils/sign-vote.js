import { crypto } from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import { Buffer } from "buffer";
import { Int64LE } from "int64-buffer";
import secp256k1 from "secp256k1";
import { swapEndiannessInPlace, swapEndianness } from "./buffer-math";
import { syscoinNetworks } from "./networks";
import * as secp from "@bitcoinerlab/secp256k1";
 
const ECPair = ECPairFactory(secp);


/**
 * This function returns an object that the api must receive to make the vote through the mn, collecting the data for the vote and making the signature
 * @function
 * @name signVote
 * @param {Object} obj data of the voting
 */
const signVote = (obj) => {
  // eslint-disable-next-line
  try {
    const { mnPrivateKey, vinMasternode, gObjectHash, voteOutcome } = obj;
    const network =
      process.env.REACT_APP_CHAIN_NETWORK === "main"
        ? syscoinNetworks.mainnet
        : syscoinNetworks.testnet;
    const time = Math.floor(Date.now() / 1000);
    const gObjectHashBuffer = Buffer.from(gObjectHash, "hex");
    const voteSignalNum = 1; // 'funding'
    const voteOutcomeNum = voteOutcome; // 1 for yes. 2 for no. 0 for abstain

    const masterNodeTx = vinMasternode.split("-");

    const vinMasternodeBuffer = Buffer.from(masterNodeTx[0], "hex");
    swapEndiannessInPlace(vinMasternodeBuffer);
    const vinMasternodeIndexBuffer = Buffer.allocUnsafe(4);
    const outputIndex = parseInt(masterNodeTx[1]);
    vinMasternodeIndexBuffer.writeInt32LE(outputIndex);
    const gObjectHashBufferLE = swapEndianness(gObjectHashBuffer);
    const voteOutcomeBuffer = Buffer.allocUnsafe(4);
    voteOutcomeBuffer.writeInt32LE(voteOutcomeNum);
    const voteSignalBuffer = Buffer.allocUnsafe(4);
    voteSignalBuffer.writeInt32LE(voteSignalNum);
    const timeBuffer = new Int64LE(time).toBuffer();
    const message = Buffer.concat([
      vinMasternodeBuffer,
      vinMasternodeIndexBuffer,
      gObjectHashBufferLE,
      voteOutcomeBuffer,
      voteSignalBuffer,
      timeBuffer,
    ]);

    const hash = crypto.hash256(message);

    let signObj = null;
    let privateKeyBuffer;
    let isCompressed = true;
    if (/^[0-9a-fA-F]{64}$/.test(mnPrivateKey)) {
      privateKeyBuffer = Buffer.from(mnPrivateKey, "hex");
    } else {
      const keyPair = ECPair.fromWIF(`${mnPrivateKey}`, network);
      if (!keyPair.privateKey) {
        throw new Error("mnPrivateKey WIF does not contain a private key");
      }
      privateKeyBuffer = Buffer.from(keyPair.privateKey);
      isCompressed = keyPair.compressed;
    }

    if (privateKeyBuffer.length !== 32) {
      throw new Error("mnPrivateKey must be 32 bytes");
    }

    signObj = secp256k1.sign(hash, privateKeyBuffer);
    const recId = 27 + signObj.recovery + (isCompressed ? 4 : 0);

    const recIdBuffer = Buffer.allocUnsafe(1);
    recIdBuffer.writeInt8(recId);
    const rawSignature = Buffer.concat([recIdBuffer, signObj.signature]);
    const signature = rawSignature.toString("base64");

    let vote;
    let signal;

    // Note: RPC command uses english, signed vote message uses numbers
    if (voteSignalNum === 0) signal = "none";
    if (voteSignalNum === 1) signal = "funding"; // -- fund this object for it's stated amount
    if (voteSignalNum === 2) signal = "valid"; //   -- this object checks out in sentinel engine
    if (voteSignalNum === 3) signal = "delete"; //  -- this object should be deleted from memory entirely
    if (voteSignalNum === 4) signal = "endorsed"; //   -- officially endorsed by the network somehow (delegation)

    if (voteOutcomeNum === 0) vote = "none";
    if (voteOutcomeNum === 1) vote = "yes";
    if (voteOutcomeNum === 2) vote = "no";
    if (voteOutcomeNum === 3) vote = "abstain";
    return {
      txHash: masterNodeTx[0],
      txIndex: masterNodeTx[1],
      governanceHash: gObjectHash, //gObjectHashBuffer.toString("hex"),
      signal,
      vote,
      time,
      signature,
    };
  } catch (err) {
    return err.message;
  }
};

export default signVote;
