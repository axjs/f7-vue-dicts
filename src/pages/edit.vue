<template>
<f7-page>
  <f7-navbar back-link="Back" title="Data Binding" sliding></f7-navbar>

  <f7-list>
    <f7-list-item>
      <f7-label>{{$route.url}}</f7-label>
    </f7-list-item>
    <f7-list-item>
      <f7-label>Name</f7-label>
      <f7-input type="text" :value="item.name" v-model="item.name"></f7-input>
    </f7-list-item>
    <f7-list-item>
      <f7-label>Last Name</f7-label>
      <f7-input type="text" :value="item.lastName" v-model="item.lastName"></f7-input>
    </f7-list-item>
    <f7-list-item>
      <f7-label>Age</f7-label>
      <f7-input type="select" v-model.number="item.age">
        <option v-for="n in 40" :value="n" :selected="item.age === n">{{n}}</option>
      </f7-input>
    </f7-list-item>
  </f7-list>
</f7-page>
</template>
<script>
export default {
  // data: function() {
  //   return {
  //     item: {}
  //   }
  // },
  computed: {
    item: function() {
      return this.$root.item || {}
    }
  },
  mounted: function() {
    console.log('$route', this.$route.params.id)
    this.$root.setCurrent(this.$route.params.id)
  }
}
</script>
