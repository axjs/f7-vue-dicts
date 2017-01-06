<template>
<f7-list form contacts>
  <f7-list-item v-for="field in fields">
    <f7-icon icon="icon-plus"></f7-icon>
    <f7-icon v-if="field.icon" slot="media" f7="person"></f7-icon>
    <f7-label v-if="field.label">{{ field.label }}</f7-label>
    <f7-input :type="field.type" :value="item[field.key] || field.default" v-model="item[field.key]" @change="field.type === 'switch' && (item[field.key] = +arguments[0].target.checked)">
      <template v-if="field.type === 'select'">
        <option v-for="option in field.options" :value="option.value" :selected="(item[field.key] || field.default)== option.value">{{option.text}}</option>
     </template>
    </f7-input>
  </f7-list-item>
</f7-list>
</template>
<script>
export default {
  props: {
    fields: Array,
    item: Object
  }
}
</script>
