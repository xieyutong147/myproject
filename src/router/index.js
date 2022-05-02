import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {getToken, setToken} from "@/utils/token";
import {Message} from "element-ui";
import request from "@/utils/request";
import {state_code} from "../../public/property";
import {SET_TOKEN} from "@/store/mutation-types";
import store from "@/store";
import message from "element-ui/packages/message";
import notification from "element-ui/packages/notification";
import moment from "moment";
Vue.use(VueRouter)

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/messageBoard',
        component: r => require.ensure([], () => r(require('@/views/MessageBoard')), 'messageboard')
      },
      {
        path: '/write',
        component: r => require.ensure([], () => r(require('@/views/blog/WritePost'))),
        meta: {
          requireLogin: true
        },
      },
      {
        path: '/posts/:id',
        name: 'posts',
        component: () => import(/* webpackChunkName: "about" */ '../views/blog/PostPage.vue'),
      },
      {
        path: '/category',
        name: 'category',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/Category.vue')
      },
      {
        path: '/category/:id',
        name: 'oneItem',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/OneItem.vue')
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/Admin.vue')
      },
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/userInfo/:id',
    name: 'userInfo',
    meta: {
      requireLogin: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/UserInfo.vue'),
  },
  {
    path: '/login',
    name: 'login',

    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/forgetPass',
    name: 'forgetPass',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgetPass.vue')
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  let token = getToken();
  if(to.path==='/'){
    if(!store.state.isLogin) {
      if (token !== "") {
        request.post("/users/login").then(res => {
          if (res.code === state_code.SUCCESS_LOGIN) {
            let time = new Date().getTime()

            console.log(res.data.token,res.data.expireTime)
            setToken(res.data.token,res.data.expireTime)
            store.commit('SET_TOKEN',  res.data.token)
            store.commit('SET_USERNAME', res.data.user.username)
            store.commit('SET_NICKNAME', res.data.user.nickname)
            store.commit('SET_AVATAR', res.data.user.avatar)
            store.commit('SET_ID', res.data.user.id)
            store.commit('SET_CREATE_TIME', res.data.user.create_time)
            store.commit('SET_EMAIL', res.data.user.email)
            store.commit('SET_IS_LOGIN', true)
            store.commit('SET_ROLE', res.data.user.role)
            console.log(store.state.isLogin)
            notification({type: "success", message: res.message})
            next()
          } else {
            notification({type: "error", message: res.message})
            next()
          }
        })
      }
    }
  }
  if(to.meta.requireLogin){
    console.log(store.state.isLogin)
    if(to.meta.requireLogin===store.state.isLogin){
      next()
    }else {
      message({type:"warning",message:"请先登录",duration:1000})
      // setTimeout(()=>{
      //   next('/login')
      // },2001)
      next('/login')

    }


  }
  next()
})

export default router
