import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AllPosts from '@/pages/AllPosts.vue';
import AddNew from '@/pages/AddNew.vue';
import EditPost from '@/pages/EditPost.vue';
import Preview from '@/pages/Preview.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'AllPosts', component: AllPosts },
  { path: '/add', name: 'AddNew', component: AddNew },
  { path: '/edit/:id', name: 'EditPost', component: EditPost, props: true },
  { path: '/preview', name: 'Preview', component: Preview },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
