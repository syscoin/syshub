import {crypto, ECPair} from 'bitcoinjs-lib'
import {Buffer} from 'buffer'
import {Int64LE} from 'int64-buffer'
import secp256k1 from 'secp256k1'
import {swapEndiannessInPlace, swapEndianness} from 'buffer-math'

/**
 * function used to sign the vote so it has the data correctly to use in the api
 * @function
 * @param {Object} obj data of the voting
 */
const signVote = (obj) => {
  // eslint-disable-next-line
  try {
    const {mnPrivateKey, vinMasternode, gObjectHash, voteOutcome} = obj

    const time = Math.floor(Date.now() / 1000);
    const gObjectHashBuffer = Buffer.from(gObjectHash, 'hex');
    const voteSignalNum = 1; // 'funding'
    const voteOutcomeNum = voteOutcome; // 1 for yes. 2 for no. 0 for abstain

    const masterNodeTx = vinMasternode.split('-');

    const vinMasternodeBuffer = Buffer.from(masterNodeTx[0], 'hex');
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
      timeBuffer
    ]);

    const hash = crypto.hash256(message);
    const keyPair = ECPair.fromWIF(`${mnPrivateKey}`)
    const sigObj = secp256k1.sign(hash, keyPair.privateKey);

    const recId = 27 + sigObj.recovery + (keyPair.compressed ? 4 : 0);

    const recIdBuffer = Buffer.allocUnsafe(1);
    recIdBuffer.writeInt8(recId);
    const rawSignature = Buffer.concat([recIdBuffer, sigObj.signature]);
    const signature = rawSignature.toString('base64');

    let vote;
    let signal;

    // Note: RPC command uses english, signed vote message uses numbers
    if (voteSignalNum === 0) signal = 'none';
    if (voteSignalNum === 1) signal = 'funding'; // -- fund this object for it's stated amount
    if (voteSignalNum === 2) signal = 'valid'; //   -- this object checks out in sentinel engine
    if (voteSignalNum === 3) signal = 'delete'; //  -- this object should be deleted from memory entirely
    if (voteSignalNum === 4) signal = 'endorsed'; //   -- officially endorsed by the network somehow (delegation)

    if (voteOutcomeNum === 0) vote = 'none';
    if (voteOutcomeNum === 1) vote = 'yes';
    if (voteOutcomeNum === 2) vote = 'no';
    if (voteOutcomeNum === 3) vote = 'abstain';

    return {
      txHash: masterNodeTx[0],
      txIndex: masterNodeTx[1],
      governanceHash: gObjectHashBuffer.toString('hex'),
      signal,
      vote,
      time,
      signature
    }
  } catch (err) {
    return err.message
  }
}

export default signVote;
