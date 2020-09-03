import _ from 'underscore';

const dbUpgradeFrom_0_To_1 = async paramObj => {
  const DB_VERSION_TO_APPLY = '0';
  const DB_VERSION_UPDATED = '1';
  const firebase = paramObj.provider;
  const dbVersion = await firebase.getDbVersion();
  if (dbVersion.toString() === DB_VERSION_TO_APPLY) {
    /*********************************
     * Actions are defined from here *
     *********************************/
    const usernameList = await firebase.getDocument('usernames');
    _.mapObject(usernameList, async (val, key) => {
      const userListRef = await firebase.getDocumentRef('usersList');
      userListRef.child(val).set(key);
    });
    /****************************
     * Actions definition's End *
     ****************************/
    firebase.setDbVersion(DB_VERSION_UPDATED);
    // console.log(`DbUpdate::DB updated to version ${DB_VERSION_UPDATED}`);
    return;
  }
  // console.log(`DbUpdate::Already in v${DB_VERSION_UPDATED} or higher`);
};

const dbUpgradeFrom_1_To_2 = async paramObj => {
  const DB_VERSION_TO_APPLY = '1';
  const DB_VERSION_UPDATED = '2';
  const firebase = paramObj.provider;
  const dbVersion = await firebase.getDbVersion();
  if (dbVersion.toString() === DB_VERSION_TO_APPLY) {
    /*********************************
     * Actions are defined from here *
     *********************************/
    const usernameList = await firebase.getDocument('usernames');
    _.mapObject(usernameList, async (val, key) => {
      const userInfoRef = await firebase.getDocumentRef('usersInfo');
      userInfoRef
        .child(key)
        .child('name')
        .set(val);
    });
    const messagesRef = await firebase.getDocumentRef('messages');
    messagesRef.remove();
    const votesRef = await firebase.getDocumentRef('votes');
    votesRef.remove();
    const usernamesRef = await firebase.getDocumentRef('usernames');
    usernamesRef.remove();
    /****************************
     * Actions definition's End *
     ****************************/

    firebase.setDbVersion(DB_VERSION_UPDATED);
    // console.log(`DbUpdate::DB updated to version ${DB_VERSION_UPDATED}`);
    return;
  }
  // console.log(`DbUpdate::Already in v${DB_VERSION_UPDATED} or higher`);
};

const dbUpgradeFrom_2_To_3 = async paramObj => {
  const DB_VERSION_TO_APPLY = '2';
  const DB_VERSION_UPDATED = '3';
  const firebase = paramObj.provider;
  const dbVersion = await firebase.getDbVersion();
  if (dbVersion.toString() === DB_VERSION_TO_APPLY) {
    /*********************************
     * Actions are defined from here *
     *********************************/
    let nUser = 0;
    const mnList = await firebase.getDocument('usersInfo');
    for (var key in mnList) {
      const value = mnList[key].name;
      if (value.indexOf('-deleted') === -1) {
        nUser += 1;
      }
    }
    const userListRef = await firebase.getDocumentRef('dbinfo');
    userListRef.child('nUsers').set(nUser);

    /****************************
     * Actions definition's End *
     ****************************/

    firebase.setDbVersion(DB_VERSION_UPDATED);
    // console.log(`DbUpdate::DB updated to version ${DB_VERSION_UPDATED}`);
    return;
  }
  // console.log(`DbUpdate::Already in v${DB_VERSION_UPDATED} or higher`);
};

const dbUpgradeFrom_3_To_4 = async paramObj => {
  const DB_VERSION_TO_APPLY = '3';
  const DB_VERSION_UPDATED = '4';
  const firebase = paramObj.provider;
  const dbVersion = await firebase.getDbVersion();
  if (dbVersion.toString() === DB_VERSION_TO_APPLY) {
    /*********************************
     * Actions are defined from here *
     *********************************/
    const twoFAAuthList = await firebase.getDocument('2FAAuth');
    _.mapObject(twoFAAuthList, async (val, key) => {
      const userInfoRef = await firebase.getDocumentRef('usersInfo');
      userInfoRef
        .child(key)
        .child('2FA')
        .set(val);
    });
    const twoFAAuthRef = await firebase.getDocumentRef('2FAAuth');
    twoFAAuthRef.remove();

    const masternodeList = await firebase.getDocument('MasterNodes');
    let nMnodes = 0;
    _.mapObject(masternodeList, async (val, key) => {
      nMnodes += _.size(val);
    });
    const userListRef = await firebase.getDocumentRef('dbinfo');
    userListRef.child('nMnodes').set(nMnodes);

    /****************************
     * Actions definition's End *
     ****************************/

    firebase.setDbVersion(DB_VERSION_UPDATED);
    // console.log(`DbUpdate::DB updated to version ${DB_VERSION_UPDATED}`);
    return;
  }
  // console.log(`DbUpdate::Already in v${DB_VERSION_UPDATED} or higher`);
};

/********************
 * public functions *
 ********************/

export const dbUpgrade = async paramObj => {
  await dbUpgradeFrom_0_To_1(paramObj);
  await dbUpgradeFrom_1_To_2(paramObj);
  await dbUpgradeFrom_2_To_3(paramObj);
  await dbUpgradeFrom_3_To_4(paramObj);
};
