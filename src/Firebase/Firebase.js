import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
  
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
