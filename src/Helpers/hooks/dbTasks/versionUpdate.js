import _ from 'underscore';

const dbUpgradeFrom_0_To_1 = async paramObj => {
  const DB_VERSION_TO_APPLY = '0';
  const DB_VERSION_UPDATED = '1';
  const firebase = paramObj.provider;
  const dbVersion = await firebase.getDbVersion();
  if (dbVersion.toString() === DB_VERSION_TO_APPLY) {
    const usernameList = await firebase.getUsernameList();
    _.mapObject(usernameList, async (val, key) => {
      const userlistRef = await firebase.getDocumentRef('userlist');
      userlistRef.child(val).set(key);
    });
    firebase.setDbVersion(DB_VERSION_UPDATED);
    console.log(`DbUpdate::DB updated to version ${DB_VERSION_UPDATED}`);
    return;
  }
  console.log('DbUpdate::Nothing to do');
};

/********************
 * public functions *
 ********************/

export const dbUpgrade = async paramObj => {
  dbUpgradeFrom_0_To_1(paramObj);
};
