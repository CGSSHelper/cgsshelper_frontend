import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Calc from '@/components/Calc';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/calc',
      name: 'Calc',
      component: Calc,
    },
  ],
});
