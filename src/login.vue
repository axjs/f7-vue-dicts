<template>

  <!-- Login Screen -->
  <f7-login-screen id="login-screen" v-show="false">
    <f7-view>
      <f7-pages>
        <f7-page login-screen>
          <f7-login-screen-title v-text="name"></f7-login-screen-title>
          <f7-list form v-if="!user">
            <f7-list-item>
              <f7-label>Username</f7-label>
              <f7-input name="username" placeholder="Username" type="text" autofocus v-model="email"></f7-input>
            </f7-list-item>
            <f7-list-item>
              <f7-label>Password</f7-label>
              <f7-input name="password" type="password" placeholder="Password" v-model="password"></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-list>
            <f7-list-button v-if="!user" title="Sign In" @click="signInWithEmailAndPassword"></f7-list-button>
            <f7-list-button v-if="!user" title="Sign in by Google" @click="signInWithRedirectGoogle"></f7-list-button>
            <f7-list-label v-if="!user">
              <p>Click Sign In to close Login Screen</p>
            </f7-list-label>
            <f7-list-button v-if="!user" title="Guest sign in" @click="signInAnonymously" close-login-screen></f7-list-button>
            <f7-list-button v-if="user" title="Sign Out" @click="signOut" close-login-screen></f7-list-button>
            <!--<f7-list-button title="toggleSignIn" @click="toggleSignIn"></f7-list-button>-->
            <f7-list-button title="Close" close-login-screen></f7-list-button>
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
        email: '',
        password: '',
        error: ''
      };
    },

    computed: {
      user: function () {
        return this.$root.user
      },

      name: function () {
        var name = 'Not login'
        if (this.user) {
          if (this.user.isAnonymous) {
            name = 'Anonymous'
          } else {
            name = this.user.displayName
          }
        }
        return name
      }
    },

    methods: {
      signOut: function () {
        var vm = this
        if (firebase.auth().currentUser) {
          this.$f7.confirm('Are you sure?', function () {
            firebase.auth().signOut();
            vm.$f7.closeModal('#login-screen')
          });
        }
      },

      signInAnonymously: function () {
        var vm = this
        if (firebase.auth().currentUser) {
          vm.$f7.alert('Already signed')
          return;
        }
        firebase.auth().signInAnonymously()
          .then(function (error) {
            vm.$f7.closeModal('#login-screen')
          })
          .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/operation-not-allowed') {
              vm.$f7.alert('You must enable Anonymous auth in the Firebase Console.', 'Firebase');
            } else {
              vm.$f7.alert(errorMessage, 'Firebase')
              console.error(error);
            }
          });
      },

      signInWithPopupGoogle: function () {
        var vm = this
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function (result) {
          var token = result.credential.accessToken;
          var user = result.user;
          vm.$f7.alert(token);
        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          if (errorCode === 'auth/account-exists-with-different-credential') {
            vm.$f7.alert('You have already signed up with a different auth provider for that email.');
          } else {
            vm.$f7.alert(errorMessage, errorCode)
            console.error(error);
          }
        })
      },

      signInWithRedirectGoogle: function () {
        var vm = this
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
      },

      signInWithEmailAndPassword: function () {
        var vm = this
        if (firebase.auth().currentUser) {
          firebase.auth().signOut();
        } else {
          var email = this.email;
          var password = this.password;
          this.password = ''
          if (email.length < 4) {
            vm.$f7.alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            vm.$f7.alert('Please enter a password.');
            return;
          }
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (error) {
              vm.$f7.closeModal('#login-screen')
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/wrong-password') {
                vm.$f7.alert('Wrong password.', 'Firebase');
              } else {
                vm.$f7.alert(errorMessage, 'Firebase');
              }
              console.log(error);
              vm.error = errorMessage;
            });
        }
      }
    },
  }
</script>