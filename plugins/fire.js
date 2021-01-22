import firebase from "firebase/app";
import "firebase/database";

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
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default firebase.database().ref('todos');
