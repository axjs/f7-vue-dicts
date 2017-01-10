<template>
  <f7-page>
    <f7-navbar back-link="Back" :title="key" sliding></f7-navbar>
    <form-fields :fields="fields" :item="item"></form-fields>
  </f7-page>
</template>
<script> 

  import firebase from '../fb.js'

  import FormFields from './form-fields.vue'

  export default {
    name: 'FirebaseEdit',

    data: function () {
      return {
        // item: {}
        key: '',
        fields: [
          {
            label: 'Name',
            type: 'text',
            key: 'name'
          },
          {
            label: 'Last Name',
            type: 'text',
            key: 'lastName',
            default: 'Last Name'
          },
          {
            label: 'Age',
            type: 'text',
            key: 'age'
          },
          {
            label: 'Switch',
            type: 'switch',
            key: 'switch'
          },
          {
            label: 'Select',
            type: 'select',
            key: 'select',
            default: '3',
            options: [
              { value: 1, text: 'USD' },
              { value: 2, text: 'EUR' },
              { value: 3, text: 'UAH' },
            ]
          },
          {
            label: 'Color',
            type: 'color',
            key: 'color',
            default: '#03ff00'
          },
        ]

      }
    },
    firebase: {
      // items: firebase.database().ref('null'),
      item: {
        source: firebase.database().ref(),
        asObject: true,
        cancelCallback: function () { }
      }
    },
    watch: {
      key: function (value, oldValue) {
        console.log('KEY changed', value, oldValue)
        this.$firebaseRefs && this.$firebaseRefs.item && this.$unbind('item')
        this.$bindAsObject('item', firebase.database().ref(value))
      },
      item: {
        handler: function (value, oldValue) {
          var res = JSON.parse(JSON.stringify(value))
          delete res['.key']
          console.log('item changed', value, oldValue, value['.key'], Object.keys(value))
          if (value['.key']) {
            firebase.database().ref(this.key).set(res)
          }
        },
        deep: true
      }
    },
    mounted: function () {
      console.log('$route', this.$route.params.key, this.$route)
      this.key = this.$route.path.substring(6)
    },
    components: {
      'form-fields': FormFields
    }
  }
</script>