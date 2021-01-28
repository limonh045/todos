import firebase from "firebase/app";
import "firebase/database";
import 'firebase/firestore'

const settings = { timestampsInSnapshots: true };

var firebaseConfig = {
  apiKey: "AIzaSyD0F5Qwy0xozMVrOABKTf6ei9Tn8oP8IkI",
  authDomain: "todos-62bac.firebaseapp.com",
  projectId: "todos-62bac",
  storageBucket: "todos-62bac.appspot.com",
  messagingSenderId: "395355448283",
  appId: "1:395355448283:web:c767d70a41a6f4d00cbdfe",
  measurementId: "G-1NKCXMCBJ7"
};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// const firebaseApp = firebase.initializeApp(firebaseConfig);

export const todos = firebase.database().ref('todos');
export const db = firebase;
export const cd = firebase.firestore();
