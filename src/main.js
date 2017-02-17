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
//  OR for Material Theme:
// import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
// import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// firebase.auth().signInAnonymously().catch(function (error) {
//   console.error('ERROR', error)
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

// Init App
window.app = new Vue({
  name : 'Main',
  el: '#app',
  template: '<app/>',
  data: function () {
    return {
      user: null,
      popupOpened: false,
      loginScreenOpened: false,
      pickerOpened: false,
      actionsOpened: false,
    };
  },
  firebase: {
    // items: firebase.database().ref('null'),
    dicts: {
      source: firebase.database().ref('_dicts'),
      asObject: true,
      cancelCallback: function () {
        console.error('cancelCallback')
      }
    }
  },
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    pushState: true,
    uniqueHistory: true,
    routes: Routes,
    preroute: function (view, options) {
      console.log('preroute', app)

      if (!firebase.auth().currentUser) {
        window.f7.loginScreen()
        // view.router.loadPage('auth.html'); //load another page with auth form
        return false; //required to prevent default router action
      } else {
        return true
      }
    }
  },

  beforeCreate: function () {
    var vm = this
    firebase.auth().onAuthStateChanged(function (user) {
      console.log('USER', user)
      vm.user = user
    })
  }, // 2.x

  // Register App Component
  components: {
    app: App
  },
});
