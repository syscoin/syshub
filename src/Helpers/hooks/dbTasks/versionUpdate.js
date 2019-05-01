export const sayHi = async firebase => {
  const lastVersion = process.env.REACT_APP_FIREBASE_DB_VERSION;
  const dbVersion = await firebase.getBdVersion();
  if (lastVersion === dbVersion.toString()) {
    return;
  }
  console.log('ACZ hook -->', dbVersion);
};
