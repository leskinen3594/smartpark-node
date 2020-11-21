// var firebase = require('firebase')
import firebase from 'firebase'
const { initializeApp } = firebase

//Config
const firebaseConfig = {
    apiKey: "AIzaSyBBYQjQRwalw7afWl4NkgDoKNidcp3QSLA",
    authDomain: "peoplencardetect.firebaseapp.com",
    databaseURL: "https://peoplencardetect.firebaseio.com",
    projectId: "peoplencardetect",
    storageBucket: "peoplencardetect.appspot.com",
    messagingSenderId: "155222711004",
    appId: "1:155222711004:web:74ce98d10df5a333133219",
    measurementId: "G-26VXKPN7YJ"
};

// Initialize Firebase
var firebaseInit = initializeApp(firebaseConfig);
export default firebaseInit
