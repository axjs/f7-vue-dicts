<template>
  <f7-page>
    <f7-block-title>Welcome to my App</f7-block-title>
    <f7-block inner>
      <p>Duis sed erat ac eros ultrices pharetra id ut tellus. Praesent rhoncus enim ornare ipsum aliquet ultricies. Pellentesque
        sodales erat quis elementum sagittis.</p>
    </f7-block>
    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
      <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item>
      <f7-list-item link="/data-binding/" title="data-binding"></f7-list-item>
      <f7-list-item link="/data-binding-edit/" title="data-binding-edit"></f7-list-item>
      <f7-list-item link="/lists/users" title="users"></f7-list-item>
      <f7-list-item link="/lists/goods" title="goods"></f7-list-item>
      <f7-list-item link="/lists/cats" title="cats"></f7-list-item>
      <f7-list-item link="/lists/dicts" title="dicts"></f7-list-item>
    </f7-list>
    <f7-block-title>Side Panels</f7-block-title>
    <f7-block>
      <f7-grid>
        <f7-col width="50">
          <f7-button open-panel="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button open-panel="right">Right Panel</f7-button>
        </f7-col>
      </f7-grid>
    </f7-block>
    <f7-block-title>Modals</f7-block-title>
    <f7-block>
      <f7-grid>
        <f7-col width="50">
          <f7-button open-popup="#popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button open-login-screen="#login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-grid>
    </f7-block>
  </f7-page>
</template>
<script>
  export default {}
</script>