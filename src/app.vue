<template>
  <!-- App -->
  <div id="app">
    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>
    <!-- Left Panel -->
    <left></left>
    <!-- Right Panel -->
    <right></right>
    <!-- Main Views -->
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <!-- Navbar -->
        <f7-navbar>
          <f7-nav-left>
            <f7-link icon="icon-bars" open-panel="left"></f7-link>
          </f7-nav-left>
          <f7-nav-center sliding>Framework7</f7-nav-center>
          <f7-nav-right>
            <f7-link icon="icon-bars" open-panel="right"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <!-- Pages -->
        <f7-pages>
          <main-page></main-page>
        </f7-pages>
      </f7-view>
    </f7-views>
    <!-- Popup -->
    <popup></popup>
    <!-- Login Screen -->
    <login></login>
  </div>
</template>

<script>
  import Login from './login'
  import Right from './right'
  import Left from './left'
  import Popup from './popup'
  import MainPage from './pages/main'

  export default {
    components: {
      'login': Login,
      'right': Right,
      'left': Left,
      'popup': Popup,
      'main-page': MainPage
    }
  }
</script>