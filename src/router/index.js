import Vue from 'vue';
import Router from 'vue-router';
import ArticleList from '../components/Content/ArticleList.vue';
import Article from '../components/Content/Article.vue';
import User from '../components/User/User.vue';
import Release from '../components/Release';
import Member from '../components/Member';
import Login from '../components/Login/Login';
import Pay from '../components/pay';

import Register from '../components/Login/register';


Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'articleList',
      component: ArticleList
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    },
    {
        path: '/user',
      name: 'user',
      component: User
    },
    //发布帖子
    {
      path: '/release',
      name: 'release',
      component: Release,
    },
    //开通会员
    {
      path: '/member',
      name: 'member',
      component: Member,
      meta: {
        keepAlive: true
      }
    },
    //开通会员
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },


  ],

})
import { Toast } from 'vant';

router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('UserInfoTokenn');
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      Toast('首次登录后，免费赠送2条发帖机会');

      next({path: '/user'});
    }
  } else {
    next(); //如果无需token,那么随它去吧
  }
});

export default router
