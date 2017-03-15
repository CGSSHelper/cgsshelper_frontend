import Vue from 'vue';
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';

import event from './modules/event';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    i18n: vuexI18n.store,
    event,
  },
  strict: process.env.NODE_ENV !== 'production',
});
