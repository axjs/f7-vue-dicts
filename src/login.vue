<template>

  <!-- Login Screen -->
  <f7-login-screen id="login-screen">
    <f7-view>
      <f7-pages>
        <f7-page login-screen>
          <f7-login-screen-title>Login + {{ user ? user.uid + '/' + user.isAnonymous : '-'}}</f7-login-screen-title>
          <f7-list form>
            <f7-list-item>
              <f7-label>Username</f7-label>
              <f7-input name="username" placeholder="Username" type="text"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Password</f7-label>
              <f7-input name="password" type="password" placeholder="Password"></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" close-login-screen></f7-list-button>
            <f7-list-label>
              <p>Click Sign In to close Login Screen</p>
            </f7-list-label>
            <f7-list-button title="toggleSignIn" @click="toggleSignIn"></f7-list-button>
          </f7-list>
        </f7-page>
      </f7-pages>
    </f7-view>
  </f7-login-screen>

</template>

<script>

  import firebase from './fb.js' 

  export default {
    data: function () {
      return {
        user: null,
      };
    },
    methods: {
      toggleSignIn: function () {
        console.log('toggleSignIn')
        if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
        } else {
          // [START authanon]
          firebase.auth().signInAnonymously().catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/operation-not-allowed') {
              alert('You must enable Anonymous auth in the Firebase Console.');
            } else {
              console.error(error);
            }
            // [END_EXCLUDE]
          });
          // [END authanon]
        }
        document.getElementById('quickstart-sign-in').disabled = true;
      }
    },
    beforeCreate: function () {
      var vm = this
      firebase.auth().onAuthStateChanged(function (user) {
        console.log('USER', user, this, vm)
        vm.user = user
        vm.$root.user = user
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
    }, // 2.x
    beforeDestroy: function () {
    }

  }
</script>