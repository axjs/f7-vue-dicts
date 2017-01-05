// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

import vuefire from 'vuefire'
import firebase from 'firebase'

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

//Init Firebase
var config = {
  apiKey: "AIzaSyDc_LHRrNRto4BV23Do8NHsqNdAt26Fz10",
  authDomain: "data-ab752.firebaseapp.com",
  databaseURL: "https://data-ab752.firebaseio.com",
  storageBucket: "data-ab752.appspot.com",
  messagingSenderId: "141730081452"
};

firebase.initializeApp(config);

// Init App
window.app = new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    pushState: true,
    routes: Routes,
  },
  // firebase: {
  //     users: firebase.database().ref('users')
  // },
  methods: {
    addItem: function() {
      this.$firebaseRefs.items.push({
        name: Date.now()
      })
    },
    removeItem: function(item) {
      this.$firebaseRefs.items.child(item['.key']).remove()
    },
    setCurrent: function(key) {
      this.$bindAsObject('item', this.$firebaseRefs.items.child(key))
    }
  },
  watch: {
    dict: function(value, oldValue) {
      console.log('DICT changed', value, oldValue)
      this.$bindAsArray('items', firebase.database().ref(value))
    },
    item: {
      handler: function(value, oldValue) {
        var res = JSON.parse(JSON.stringify(value))
        delete res['.key']
        console.log('item changed', value, oldValue, value['.key'], Object.keys(value))
        if (value['.key']) {
          this.$firebaseRefs.items.child(value['.key']).set(res)
        }
      },
      deep: true
    }
  },
  // beforeMount : function (value, oldValue) {
  //   // this.dict = 'users'
  // },
  data: function() {
    return {
      dict: '',
      item: {},
      popupOpened: false,
      loginScreenOpened: false,
      pickerOpened: false,
      actionsOpened: false
    };
  },

  // Register App Component
  components: {
    app: App
  }
});
