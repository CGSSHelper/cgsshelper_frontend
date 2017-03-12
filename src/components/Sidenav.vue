<template>
  <md-sidenav class="md-left" ref="leftSidenav" 
    :md-swipeable="true">
    <md-toolbar>
      <h1 class="md-title">CGSS Helper - Menu</h1>
    </md-toolbar>

    <md-list @click.native="hideSidenav">
      <md-list-item>
        <router-link to="/" tag="span" :exact="true"><md-icon>home</md-icon> Index</router-link>
        <md-ink-ripple />
      </md-list-item>
      <md-divider></md-divider>
      <md-list-item>
        <router-link to="/calc" tag="span"><md-icon>keyboard</md-icon> Calculator</router-link>
        <md-ink-ripple />
      </md-list-item>
    </md-list>
    <md-divider></md-divider>
    <p class="md-body-1">Build Date: {{buildDate}} Ver: {{ver}}</p>
  </md-sidenav>
</template>

<script>
/* global BUILD_DATE BUILD_VERSION:true */
export default {
  name: 'sidenav',
  data() {
    return {
      buildDate: BUILD_DATE,
      ver: BUILD_VERSION,
    };
  },
  methods: {
    hideSidenav() {
      this.$refs.leftSidenav.toggle();
    },
  },
};
</script>
