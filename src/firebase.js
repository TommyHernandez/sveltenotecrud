import firebase from "firebase/app";
import "firebase/firestore";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAdDriLBVuFerj7R9WlREt1tp_VKXeIGKI",
  authDomain: "svelte-crud-3fe0a.firebaseapp.com",
  projectId: "svelte-crud-3fe0a",
  storageBucket: "svelte-crud-3fe0a.appspot.com",
  messagingSenderId: "1050678191830",
  appId: "1:1050678191830:web:b2f594533baa31643d4b77",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
