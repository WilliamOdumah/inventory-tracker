// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO3p6cUq1GVMGeUFYUh7T9ncabKkA9ZBY",
  authDomain: "hspantryapp-2aa42.firebaseapp.com",
  projectId: "hspantryapp-2aa42",
  storageBucket: "hspantryapp-2aa42.appspot.com",
  messagingSenderId: "848636467659",
  appId: "1:848636467659:web:82c01bb238287cdc65be4e",
  measurementId: "G-NBVLXVM78K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {app, firestore}