// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import vuexI18n from 'vuex-i18n';
import vueMoment from 'vue-moment';
import vueLazyload from 'vue-lazyload';
import VueAnalytics from 'vue-analytics';

import 'vue-material/dist/vue-material.css';

import App from './App';
import router from './router';
import store from './store';

/* eslint-disable global-require */
Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(vuexI18n.plugin, store);
Vue.use(vueMoment);
Vue.use(vueLazyload, {
  loading: require('./assets/57.gif'),
});
Vue.use(VueAnalytics, { id: 'UA-69535723-1', router });

if (process.env.NODE_ENV === 'development') {
  Vue.config.api_addr = '//localhost:8888';
} else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing') {
  Vue.config.api_addr = '//api.cgsshelper.tk';
}

Vue.material.registerTheme({
  red: {
    primary: 'red',
  },
  blue: {
    primary: 'blue',
  },
  orange: {
    primary: 'orange',
  },
});

Vue.i18n.add('en', require('../static/locales/en.json'));
Vue.i18n.add('zh-cn', require('../static/locales/zh-cn.json'));
Vue.i18n.add('zh-tw', require('../static/locales/zh-tw.json'));

const lang = window.navigator.userLanguage || window.navigator.language;
Vue.i18n.set(lang.toLowerCase());
Vue.i18n.fallback('en');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
