<template>
<f7-page>
  <f7-navbar back-link="Back" :title="'Dict '+$root.dict" sliding></f7-navbar>
  <f7-fab color="pink">
    <!-- <f7-icon icon="icon-plus" @click="addItem"></f7-icon> -->
    <f7-fab-action color="pink" @click="addItem">A</f7-fab-action>
  </f7-fab>

  <f7-block-title>List</f7-block-title>
  <f7-list>
    <f7-list-item swipeout :link="/edit/+item['.key']" :key="item['.key']" v-for="item in items" :title="item.name" :badge="item['.key']" badge-color="red">
      <f7-swipeout-actions>
        <f7-swipeout-button delete @click="removeItem(item)">Delete</f7-swipeout-button>
      </f7-swipeout-actions>
    </f7-list-item>
  </f7-list>

</f7-page>
</template>
<script>
export default {
  // data: function() {
  //     return {
  //         items: this.$root.items
  //     }
  // },

  computed: {
    items: function() {
      console.log('items', this.$root.items)
      return this.$root.items || []
    }
  },

  methods: {
    addItem: function() {
      this.$root.addItem()
    },
    removeItem: function(item) {
      this.$root.removeItem(item)
    }
  },

  beforeMount: function() {
    console.log('mounted', this.$route.params.name)
    this.$root.dict = this.$route.params.name
  }
}
</script>
