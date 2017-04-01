<template>
  <md-toolbar>
    <md-button class="md-icon-button" @click.native="toggleLeftSidenav">
      <md-icon>menu</md-icon>
    </md-button>
    <h1 class="md-title">CGSS Helper</h1>
  </md-toolbar>
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
