
import firebase from 'firebase'

console.log('init firebase')


//Init Firebase
var config = {
    apiKey: "AIzaSyDc_LHRrNRto4BV23Do8NHsqNdAt26Fz10",
    authDomain: "data-ab752.firebaseapp.com",
    databaseURL: "https://data-ab752.firebaseio.com",
    storageBucket: "data-ab752.appspot.com",
    messagingSenderId: "141730081452"
};

firebase.initializeApp(config);

export default firebase
