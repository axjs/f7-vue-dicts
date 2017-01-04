<template>
  <f7-page>
    <f7-navbar back-link="Back" title="Lists" sliding></f7-navbar>
    <f7-fab color="pink">
      <f7-icon icon="icon-plus"></f7-icon>
    </f7-fab>

    <f7-block-title>List</f7-block-title>
    <f7-list>
      <f7-list-item swipeout
        v-for="user in users"
        :title="user.name"
        badge="3"
        badge-color="red"
      >
        <f7-swipeout-actions>
          <f7-swipeout-button delete>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  export default {
    data: function () {
      return {
        users: this.$root.users
      }
    }
  }
</script>