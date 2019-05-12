import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyB3RkV_A_JtVcZsJVGbFAbhQw5hzm7jzAM",
  authDomain: "meeting-5050.firebaseapp.com",
  databaseURL: "https://meeting-5050.firebaseio.com",
  projectId: "meeting-5050",
  storageBucket: "meeting-5050.appspot.com",
  messagingSenderId: "613327425203"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
