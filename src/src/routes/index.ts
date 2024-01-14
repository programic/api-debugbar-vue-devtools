import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: async () => import('../pages/Index.vue'),
    name: 'Index',
  },
  {
    path: '/about',
    component: async () => import('../pages/About.vue'),
    name: 'About',
  },
];

export default routes;
