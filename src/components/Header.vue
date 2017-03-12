<template>
  <md-whiteframe md-tag="md-toolbar" md-elevation="3">
    <md-toolbar>
      <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h1 class="md-title">CGSS Helper</h1>
    </md-toolbar>
  </md-whiteframe>
</template>

<script>
export default {
  name: 'header',
  methods: {
    toggleLeftSidenav() {
      this.$emit('toggle-left-sidenav');
    },
  },
};
</script>
