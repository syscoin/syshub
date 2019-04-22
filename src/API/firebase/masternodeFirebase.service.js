import { fire } from './firebase';
import Cryptr from 'cryptr';

export const getMasternodesTotal = async (uid) => {

};

export const getMasternodeList = async (uid) => {
  const masternodesRef = fire.database().ref(`MasterNodes/${uid}`);
  const rawMasternodes = await masternodesRef.once('value');
  const masternodesListObj = await rawMasternodes.val();
  const mnList = masternodesListObj ? Object.values(masternodesListObj) : [];
  return mnList;
};

export const deleteMasternode = async (masternode, uid) => {
  const masternodesRef = fire.database().ref(`MasterNodes/${uid}`);
  const selectMasternode = await masternodesRef.child(masternode.keyId);
  selectMasternode.remove();
};

export const addMasternode = async (masternode, uid) => {

  const cryptr = new Cryptr(uid);

  masternode.mnPrivateKey = cryptr.encrypt(masternode.mnPrivateKey);
  masternode.txid = cryptr.encrypt(masternode.txid);
  
  const newKey = fire.database().ref().push().key;
  
  masternode.keyId = newKey;
  masternode.key = newKey;
  
  const newMasternodeRef = fire.database().ref(`MasterNodes/${uid}`);
  const newMasternodeChild = newMasternodeRef.child(masternode.keyId);
  newMasternodeChild.set(masternode);
};

export const updateMasternode = async (masternode, uid) => {

  const cryptr = new Cryptr(uid);

  masternode.mnPrivateKey = cryptr.encrypt(masternode.mnPrivateKey);
  masternode.txid = cryptr.encrypt(masternode.txid);

  const masternodeRef = fire.database().ref(`MasterNodes/${uid}`);
  const selectedMasternode = await masternodeRef.child(masternode.keyId);
  selectedMasternode.update(masternode);
};

export const checkMasternodeExists = async ( mnPrivateKey, uid) => {
  const cryptr = new Cryptr(uid);

  const encryptedPrivateKey = cryptr.encrypt(mnPrivateKey);

  const mnList = await getMasternodeList(uid);
  const foundedMn = mnList.find((item) => item.mnPrivateKey === encryptedPrivateKey);

  return !!foundedMn;
};
