<template>
  <f7-page>
    <f7-fab color="pink">
      <!-- <f7-icon icon="icon-plus" @click="addItem"></f7-icon> -->
      <f7-fab-action color="pink" @click="addItem">A</f7-fab-action>
    </f7-fab>

    <f7-navbar back-link="Back" :title="'WebShoot '+key" sliding></f7-navbar>

    <!-- Search bar -->
    <f7-searchbar cancel-link="Отмена" search-list="#search-list" placeholder="Поиск ..." :clear-button="true"></f7-searchbar>

    <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Не найдено ..."></f7-list-item>
    </f7-list>

    <!--<f7-block-title co>WebShoot</f7-block-title>-->
    <f7-list contacts id="search-list">
      <f7-list-item swipeout link="#" @click="clicked(item)" :key="item['.key']" v-for="item in items" :title="item.title" :badge="item['counter'] || 0"
        badge-color="red">
        <f7-swipeout-actions left>
          <f7-swipeout-button color="red" @click="removeItem(item)">Delete</f7-swipeout-button>
        </f7-swipeout-actions>
        </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  import firebase from '../fb.js'

  export default {
    name: 'WebShootList',

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
        var counter = item.counter || 0
        firebase.database().ref(this.key + '/' + item['.key']).child('counter').set(++counter)

        console.log('clicked', item, counter)
        var url = item.downloadURL || item.url
        if (url) {
          var win = window.open(url, '_blank');
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
        var $firebaseRefs = this.$firebaseRefs

        this.$f7.confirm('Are you sure to delete ?<br><br>' + item.title, 'Firebase', function () {
          firebase.storage().ref().child('ws/' + item['.key']).delete().then(function () {
            $firebaseRefs.items.child(item['.key']).remove()
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