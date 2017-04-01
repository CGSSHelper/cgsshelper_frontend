<template>
  <md-sidenav class="md-left" ref="leftSidenav" 
    :md-swipeable="true">
    <md-toolbar>
      <h1 class="md-title">CGSS Helper - Menu</h1>
    </md-toolbar>

    <md-list>
      <md-list-item>
        <router-link to="/" tag="span" :exact="true" @click.native="hideSidenav"><md-icon>home</md-icon> {{$t('sidenav.index')}}</router-link>
      </md-list-item>
      <md-list-item>
        <span><md-icon>keyboard</md-icon> {{$t('sidenav.calc')}}</span>
        <md-list-expand>
          <md-list>
            <md-list-item>
              <router-link to="/calc/atapon" tag="span" @click.native="hideSidenav">{{$t('sidenav.calc.atapon')}}</router-link>
            </md-list-item>
            <md-list-item>
              <router-link to="/calc/medley" tag="span" @click.native="hideSidenav">{{$t('sidenav.calc.medley')}}</router-link>
            </md-list-item>
            <md-list-item>
              <router-link to="/calc/party" tag="span" @click.native="hideSidenav">{{$t('sidenav.calc.party')}}</router-link>
            </md-list-item>
          </md-list>
        </md-list-expand>
      </md-list-item>
    </md-list>
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
