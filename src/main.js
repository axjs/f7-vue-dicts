// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

import vuefire from 'vuefire'
import firebase from './fb.js'

console.log('import')

Vue.use(vuefire)

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
*/

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// //Init Firebase
// var config = {
//     apiKey: "AIzaSyDc_LHRrNRto4BV23Do8NHsqNdAt26Fz10",
//     authDomain: "data-ab752.firebaseapp.com",
//     databaseURL: "https://data-ab752.firebaseio.com",
//     storageBucket: "data-ab752.appspot.com",
//     messagingSenderId: "141730081452"
// };
//
// firebase.initializeApp(config);
// window.firebase = firebase

firebase.auth().onAuthStateChanged(function (user) {
    console.log('USER', user)
    // if (user) {
    //   // User is signed in.
    //   var isAnonymous = user.isAnonymous;
    //   var uid = user.uid;
    //   // ...
    // } else {
    //   // User is signed out.
    //   // ...
    // }
    // // ...
})

firebase.auth().signInAnonymously().catch(function (error) {
    console.error('ERROR', error)
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

// Init App
window.app = new Vue({
    el: '#app',
    template: '<app/>',
    data: function () {
        return {
            key: '',
            // item: {},
            // items: [],
            popupOpened: false,
            loginScreenOpened: false,
            pickerOpened: false,
            actionsOpened: false
        };
    },
    // Init Framework7 by passing parameters here
    framework7: {
        root: '#app',
        /* Uncomment to enable Material theme: */
        // material: true,
        pushState: true,
        routes: Routes,
    },
    // beforeMount : function (value, oldValue) {
    //   // this.dict = 'users'
    // },

    // Register App Component
    components: {
        app: App
    }
});
