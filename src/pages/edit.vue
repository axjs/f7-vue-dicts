<template>
  <f7-page>
    <f7-navbar back-link="Back" :title="key" sliding></f7-navbar>
    <input type="file" id="file" name="file" @change="handleFileSelect" />
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
        source: firebase.database().ref('null'),
        asObject: true,
        cancelCallback: function () {
          console.error('cancelCallback')
        }
      },
      // fields : firebase.database().ref('null'),
    },
    methods: {
      handleFileSelect: function (evt) {
        console.log('handleFileSelect', evt)
        evt.stopPropagation();
        evt.preventDefault();

        var file = evt.target.files[0];
        var metadata = {
          'contentType': file.type
        };
        firebase.storage().ref().child('images/' + file.name).put(file, metadata).then(function (snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          console.log(snapshot.metadata);
          var url = snapshot.metadata.downloadURLs[0];
          console.log('File available at', url);
        }).catch(function (error) {
          console.error('Upload failed:', error);
        });
      }

    },
    watch: {
      key: function (value, oldValue) {
        console.log('KEY changed', value, oldValue, '_dicts/' + value.split('/').slice(0, -1).join('/'))
        // bind fields
        // this.$firebaseRefs && this.$firebaseRefs.fields && this.$unbind('fields')
        // this.$bindAsObject('fields', firebase.database().ref( '_dicts/' + value.split('/').slice(0, -1).join('/')+'/fields' ))

        // bind item
        this.$firebaseRefs && this.$firebaseRefs.item && this.$unbind('item')
        this.$bindAsObject('item', firebase.database().ref(value))

      },
      item: {
        handler: function (value, oldValue) {
          var vm = this
          var res = JSON.parse(JSON.stringify(value))
          delete res['.key']
          console.log('item changed', value, oldValue, value['.key'], Object.keys(value))
          if (value['.key']) {
            firebase.database().ref(this.key).set(res)
              .then(function () {
                // console.log('Synchronization succeeded');
              })
              .catch(function (error) {
                console.log('Synchronization failed', error);
                vm.$f7.alert(error, 'Firebase')
              });
          }
        },
        deep: true
      }
    },
    mounted: function () {
      console.log('$route', this.$route.params.key, this.$route)
      this.key = this.$route.hash
    },
    components: {
      'form-fields': FormFields
    }
  }
</script>