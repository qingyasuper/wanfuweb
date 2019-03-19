import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index.vue';
import Login from './views/Login.vue';
import User from './views/User.vue';
import Admin from './views/Admin.vue';
Vue.use(Router);

export default new Router({
//  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
