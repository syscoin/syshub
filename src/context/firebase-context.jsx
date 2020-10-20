import React from 'react';

const FirebaseContext = React.useContext(null);

const firebaseContext = (props) => {
  return <FirebaseContext.Consumer/>
}

export default firebaseContext;
