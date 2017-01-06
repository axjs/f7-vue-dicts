<template>
<f7-page>
  <f7-navbar back-link="Back" :title="$root.dict+'/'+item['.key']" sliding></f7-navbar>
  <form-fields :fields="fields" :item="item"></form-fields>
</f7-page>
</template>
<script>

import FormFields from './form-fields.vue'

export default {
  data: function() {
    return {
      // item: {}
      fields: [
        {
          label: 'Name',
          type: 'text',
          key: 'name'
        },
        {
          label: 'Last Name',
          type: 'text',
          key: 'lastName'
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
          options: [
            { value: 1, text : 'USD'},
            { value: 2, text : 'EUR'},
            { value: 3, text : 'UAH'},
          ]
        },
        {
          label: 'Color',
          type: 'color',
          key: 'color'
        },
      ]

    }
  },
  computed: {
    item: function() {
      return this.$root.item || {}
    }
  },
  mounted: function() {
    console.log('$route', this.$route.params.id)
    this.$root.setCurrent(this.$route.params.id)
  },
  components: {
    'form-fields': FormFields
  }
}
</script>
