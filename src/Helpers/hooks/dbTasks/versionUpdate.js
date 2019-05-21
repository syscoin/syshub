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
    const usernameList = await firebase.getUsernameList();
    _.mapObject(usernameList, async (val, key) => {
      const userlistRef = await firebase.getDocumentRef('userlist');
      userlistRef.child(val).set(key);
    });
    /****************************
     * Actions definition's End *
     ****************************/
    firebase.setDbVersion(DB_VERSION_UPDATED);
    console.log(`DbUpdate::DB updated to version ${DB_VERSION_UPDATED}`);
    return;
  }
  console.log(`DbUpdate::Already in v${DB_VERSION_UPDATED} or higher`);
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
    const messagesRef = await firebase.getDocumentRef('messages');
    messagesRef.remove();
    const votesRef = await firebase.getDocumentRef('votes');
    votesRef.remove();
    /****************************
     * Actions definition's End *
     ****************************/

    firebase.setDbVersion(DB_VERSION_UPDATED);
    console.log(`DbUpdate::DB updated to version ${DB_VERSION_UPDATED}`);
    return;
  }
  console.log(`DbUpdate::Already in v${DB_VERSION_UPDATED} or higher`);
};

/********************
 * public functions *
 ********************/

export const dbUpgrade = async paramObj => {
  await dbUpgradeFrom_0_To_1(paramObj);
  await dbUpgradeFrom_1_To_2(paramObj);
};
