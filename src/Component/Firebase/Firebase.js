// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCZHJa-6Hq4KA8gE2L5HoTv-slPjhAfWw",
    authDomain: "rbuild-5466b.firebaseapp.com",
    projectId: "rbuild-5466b",
    storageBucket: "rbuild-5466b.appspot.com",
    messagingSenderId: "225678598746",
    appId: "1:225678598746:web:e384f5f69c162197b1ae63",
    measurementId: "G-JQND0RGK92"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = app.firestore(); /// a real-time db in firebase

const auth = firebase.auth(); /// gives us a variable to handle the stuff like signIN

export { db, auth };