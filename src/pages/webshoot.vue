<template>
  <f7-page>
    <!--<f7-fab color="pink">
      <f7-fab-action color="pink" @click="addItem"><f7-icon icon="icon-plus" @click="addItem"></f7-icon>A</f7-fab-action>
    </f7-fab>-->

    <f7-navbar back-link="Back" :title="'WebShoot '+key" sliding></f7-navbar>

    <!-- Search bar -->
    <f7-searchbar cancel-link="Отмена" search-list="#search-list" placeholder="Поиск ..." :clear-button="true"></f7-searchbar>

    <!-- Will be visible if there is no any results found, defined by "searchbar-not-found" class -->
    <f7-list class="searchbar-not-found">
      <f7-list-item title="Не найдено ..."></f7-list-item>
    </f7-list>

    <!--<f7-block-title co>WebShoot</f7-block-title>-->
    <f7-list media-list id="search-list">
      <f7-list-item smart-select smart-select-back-on-select title="Сортировка">
        <select name="sort" v-model="sort">
          <option value="">Без сортировки</option>
          <option value="!">Revers</option>
          <option value="title">По названию</option>
          <option value="!title">По названию (реверс)</option>
          <option value="counter">По количеству</option>
          <option value="!counter">По количеству (реверс)</option>
          <option value="size">По размеру</option>
          <option value="!size">По размеру (реверс)</option>
        </select>
      </f7-list-item>
      <f7-list-item :media="icon(item)" swipeout link="#" @click="clicked(item)" :key="item['.key']" v-for="item in sorted" :title="item.title"
        :badge="formatBytes(item.totalBytes) || item['counter'] || 0" badge-color="green" :subtitle="item.url">
        <f7-swipeout-actions left>
          <f7-swipeout-button color="red" @click="removeItem(item)">Delete</f7-swipeout-button>
        </f7-swipeout-actions>
        <f7-swipeout-actions right>
          <f7-swipeout-button color="green">{{item['counter'] || formatBytes(item.totalBytes)}}</f7-swipeout-button>
        </f7-swipeout-actions>
        </f7-list-item>
    </f7-list>

  </f7-page>
</template>
<script>
  import firebase from '../fb.js'
  import { formatBytes } from '../util.js'

  export default {
    name: 'WebShootList',

    data: function () {
      return {
        key: '',
        sort: ''
      }
    },

    firebase: {
      items: {
        source: firebase.database().ref('null'),
        cancelCallback: function () {
          console.error('cancelCallback!!!')
        }
      },
    },

    computed: {
      sorted: function () {
        if (this.sort === '!') {
          return this.items.reverse()
        } else if (this.sort === 'counter') {
          return this.items.sort(function (a, b) {
            var a1 = a.counter || 0
            var b1 = b.counter || 0
            return a1 - b1
          })
        } else if (this.sort === '!counter') {
          return this.items.sort(function (a, b) {
            var a1 = a.counter || 0
            var b1 = b.counter || 0
            return a1 - b1
          }).reverse()
        } else if (this.sort === 'title') {
          return this.items.sort(function (a, b) {
            var a1 = a.title
            var b1 = b.title
            return a1 === b1 ? 0 : (a1 > b1 ? 1 : -1)
          })
        } else if (this.sort === '!title') {
          return this.items.sort(function (a, b) {
            var a1 = a.title
            var b1 = b.title
            return a1 === b1 ? 0 : (a1 > b1 ? 1 : -1)
          }).reverse()
        } else if (this.sort === 'size') {
          return this.items.sort(function (a, b) {
            var a1 = a.totalBytes || 0
            var b1 = b.totalBytes || 0
            return a1 - b1
          })
        } else if (this.sort === '!size') {
          return this.items.sort(function (a, b) {
            var a1 = a.totalBytes || 0
            var b1 = b.totalBytes || 0
            return a1 - b1
          }).reverse()
        } else {
          return this.items
        }
      }
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
      formatBytes: formatBytes,
      icon: function (item) {
        //FIXME: test
        return '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACLklEQVRYR+3XSchOURgH8N+HTKWUITskkalMJTMl9iQlZaFEqS9zyBBlKLKQYaVQErFThhKhZLZASYmFhWEh6TPr+TqvXrd73Vs2FvfUWbzvM5z/+T/P/5xzWxSPwRiLr7iGN3/xzTP1xRR0wW08y3NqKUi6B2vwAZ0RfpuwFz9LgITvOmzDd3xGT+zG+mxsHoBpuIRZaeedsBgHsAW7SgBsxgYsw3F8w4yUM3LfaI7PA7AVczAhs9BCHMNE3CoAMTmBno8zGZ+7OIcdZQCCpkUYnrPIWQzA+ERvs0swdQ+PsSAnNnrgEPaVARiFh5iEm5lEsfgTtOJIxrYilWcoXmVs03EFw1L8b3NRE0a956V5PZMsmnF1UsjzZBuCO9iOaODmEXU/jRNYWaUJw6cjdmJVqulFvEiSDKpPpkSPkkJGpt9BfXR+KCfYmp2YDFAB/EcegJlYi7acuvVAf/RGd3RIs4i5kGgsEvMT3ibgH3Nyd42SRaKQ2NGcmhapbUliKJqteUR9v6RcJUptNy+NZm8ACG33qxKFpziM/Rn/6IvYzIiKeYKd1hrAf8NANGFjVLlsLqe7orncVzG14mXViGtvwkHp7I/D5zxeljRRaP0gNmb8QuuhkFMl8QPT+bAcFxp6DgW8xmg8KEnwryoYl94HfeKcqAHUDNQM1AzUDNQM/HcMxEX4ruQ27JXs2XdDbCb+e18x/o/bsBvmVnxMjkH45414it+vmCe+Hdt+ARY+2qtAVFYvAAAAAElFTkSuQmCC" ALT="Larry">'

        var url = item.url
        var arr = (/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im).exec(url)
        if (!arr || !arr.length || !arr[0]) {
          console.error('invalid url: ' + url, arr)
          return '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACLklEQVRYR+3XSchOURgH8N+HTKWUITskkalMJTMl9iQlZaFEqS9zyBBlKLKQYaVQErFThhKhZLZASYmFhWEh6TPr+TqvXrd73Vs2FvfUWbzvM5z/+T/P/5xzWxSPwRiLr7iGN3/xzTP1xRR0wW08y3NqKUi6B2vwAZ0RfpuwFz9LgITvOmzDd3xGT+zG+mxsHoBpuIRZaeedsBgHsAW7SgBsxgYsw3F8w4yUM3LfaI7PA7AVczAhs9BCHMNE3CoAMTmBno8zGZ+7OIcdZQCCpkUYnrPIWQzA+ERvs0swdQ+PsSAnNnrgEPaVARiFh5iEm5lEsfgTtOJIxrYilWcoXmVs03EFw1L8b3NRE0a956V5PZMsmnF1UsjzZBuCO9iOaODmEXU/jRNYWaUJw6cjdmJVqulFvEiSDKpPpkSPkkJGpt9BfXR+KCfYmp2YDFAB/EcegJlYi7acuvVAf/RGd3RIs4i5kGgsEvMT3ibgH3Nyd42SRaKQ2NGcmhapbUliKJqteUR9v6RcJUptNy+NZm8ACG33qxKFpziM/Rn/6IvYzIiKeYKd1hrAf8NANGFjVLlsLqe7orncVzG14mXViGtvwkHp7I/D5zxeljRRaP0gNmb8QuuhkFMl8QPT+bAcFxp6DgW8xmg8KEnwryoYl94HfeKcqAHUDNQM1AzUDNQM/HcMxEX4ruQ27JXs2XdDbCb+e18x/o/bsBvmVnxMjkH45414it+vmCe+Hdt+ARY+2qtAVFYvAAAAAElFTkSuQmCC" ALT="Larry">'
        } else {
          return "<img src='" + arr[0] + "/favicon.ico" + "' ALT='@'>"
        }
      },
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