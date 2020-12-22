import * as firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAUil9NODyG1trjjFPDs5Cid3Dj8ZV4K2I",
  authDomain: "sptm-e5238.firebaseapp.com",
  databaseURL:"https://sptm-e5238-default-rtdb.firebaseio.com/",
  projectId: "sptm-e5238",
  storageBucket: "sptm-e5238.appspot.com",
  messagingSenderId: "176172111986",
  appId: "1:176172111986:web:8d419fb780fec2e44f4aeb",
  measurementId: "G-D9CX3RTY2K"

};
firebase.initializeApp(config);

export const database = firebase.database().ref("/projectasks");

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
