<template>
  <f7-page>
    <f7-fab color="pink">
      <!-- <f7-icon icon="icon-plus" @click="addItem"></f7-icon> -->
      <f7-fab-action color="pink" @click="addItem">A</f7-fab-action>
    </f7-fab>

    <f7-navbar back-link="Back" :title="'Dict '+key" sliding></f7-navbar>
    <!-- <f7-block-title co>List</f7-block-title> -->
    <f7-list contacts>
      <f7-list-item swipeout :link="item.downloadURL || '#'" :link-external="true" :key="item['.key']" v-for="item in items" :title="item.title"
        :badge="item['totalBytes'] || false" badge-color="red">
        <f7-swipeout-actions>
          <f7-swipeout-button @click="removeItem(item)">Delete</f7-swipeout-button>
        </f7-swipeout-actions>
        </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  import firebase from '../fb-webshot.js'
  window.firebase = firebase
  export default {
    name: 'FirebaseList',

    data: function () {
      return {
        key: '',
      }
    },

    firebase: {
      items: firebase.database().ref('null'),
    },

    watch: {
      key: function (value, oldValue) {
        if (value === oldValue)
          return

        console.log('key changed', value, oldValue)
        this.$firebaseRefs && this.$firebaseRefs.items && this.$unbind('items')
        this.$bindAsArray('items', firebase.database().ref(value))
      }
    },

    methods: {
      clicked: function (item) {
        console.log('clicked', item)
        var url = item.downloadURL
        if (url) {
          var win = window.open(item.url, '_blank');
          win && win.focus();
        }
      },
      addItem: function () {
        // this.$firebaseRefs.items.push({
        //   name: 'ax'
        // })
      },
      removeItem: function (item) {
        var alert = this.$f7.alert

        this.$f7.confirm('Are you sure?', 'Firebase', function () {
          firebase.storage().ref().child('ws/' + item['.key']).delete().then(function () {
            this.$firebaseRefs.items.child(item['.key']).remove()
            console.log('ok')
          }).catch(function (error) {
            error && error.message && alert(error.message, 'Firebase')
            
            console.log(error)
          });
        });

      }
    },

    beforeMount: function () {
      this.key = 'ws' //this.$route.hash
    }
  }

</script>