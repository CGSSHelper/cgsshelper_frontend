import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Calc from '@/components/Calc';
import Atapon from '@/components/Calc/Atapon';
import Medley from '@/components/Calc/Medley';
import Party from '@/components/Calc/Party';

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
      children: [
        {
          path: 'atapon',
          name: 'Atapon',
          component: Atapon,
        },
        {
          path: 'medley',
          name: 'Medley',
          component: Medley,
        },
        {
          path: 'party',
          name: 'Party',
          component: Party,
        },
      ],
    },
  ],
});
