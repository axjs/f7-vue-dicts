<template>
  <f7-page>
    <f7-fab color="pink">
      <!-- <f7-icon icon="icon-plus" @click="addItem"></f7-icon> -->
      <f7-fab-action color="pink" @click="addItem">A</f7-fab-action>
    </f7-fab>

    <f7-navbar back-link="Back" :title="'Dict '+key" sliding></f7-navbar>
    <!-- <f7-block-title co>List</f7-block-title> -->
    <f7-list contacts>
      <f7-list-item swipeout :link="/edit/+key+'/'+item['.key']" :key="item['.key']" v-for="item in items" :title="item.name" :badge="item['.key']"
        badge-color="red">
        <f7-swipeout-actions>
          <f7-swipeout-button delete @click="removeItem(item)">Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  console.log('list.vue', this)

  import firebase from '../fb.js'

  export default {
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
        console.log('DICT changed', value, oldValue)
        this.$firebaseRefs && this.$firebaseRefs.items && this.$unbind('items')
        this.$bindAsArray('items', firebase.database().ref(value))
      },
      $route: {
        handler: function (value, oldValue) {
          console.log('$ROUTE changed', value, oldValue)
          this.key = this.$route.params.name
        },
        deep: true
      }
    },

    methods: {
      addItem: function () {
        this.$firebaseRefs.items.push({
          name: 'ax'
        })
      },
      removeItem: function (item) {
        this.$firebaseRefs.items.child(item['.key']).remove()
      }
    },

    beforeMount: function () {
      this.key = this.$route.params.name
    }
  }
</script>