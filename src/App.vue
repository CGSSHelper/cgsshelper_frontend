<template>
  <div id="app">
    <left-sidenav ref="leftSidenav"></left-sidenav>
    <div class="page-content">
      <header-comp class="page-header" @toggle-left-sidenav="toggleLeftSidenav"></header-comp>
      <router-view class="main-content"></router-view>
    </div>
  </div>
</template>

<script>
import headerComp from './components/Header';
import leftSidenav from './components/Sidenav';

export default {
  name: 'app',
  components: { headerComp, leftSidenav },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.$refs.leftSidenav.toggle();
    },
  },
};
</script>

<style>
@import '//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic';
@import '//fonts.googleapis.com/icon?family=Material+Icons';

.clickable {
  cursor: pointer;
}

html, body {
  height: 100%;
  overflow: hidden;
}

#app, body {
  display: flex;
}

#app {
  min-height: 100%;
  flex-flow: column nowrap;
  flex: 1;
}

.page-content {
  min-height: 100%;
  max-height: 100%;
  flex: 1;
  display: flex;
  flex-flow: column;
}

.page-header {
  z-index: 2;
}

.main-content {
  flex: 1;
  overflow: auto;
}
</style>
