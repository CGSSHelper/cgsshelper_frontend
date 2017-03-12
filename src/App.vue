<template>
  <div id="app">
    <header-comp @toggle-left-sidenav="toggleLeftSidenav"></header-comp>
    <left-sidenav ref="leftSidenav"></left-sidenav>
    <router-view></router-view>
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
</style>
