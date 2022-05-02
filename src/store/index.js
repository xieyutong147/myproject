import Vuex from 'vuex'
import Vue from 'vue'
import {defaultState} from "./state/state";
import {defaultMutations} from "./mutations/mutations";
import {defaultGetters} from "./getters/getters";
import {defaultActions} from './actions/actions'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)
const store= new Vuex.Store({
  state:defaultState,
  mutations:defaultMutations,
  getters:defaultGetters,
  actions:defaultActions,
  plugins: [vuexLocal.plugin]
  // state: {
  //   id: '',
  //   username: '',
  //   nickname: 'null',
  //   avatar: '',
  //   token: getToken(),
  //   create_time:'',
  //   email:"null",
  //   isLogin:false,
  //   role:''
  // },
  // mutations: {
  //   SET_TOKEN: (state, token) => {
  //     state.token = token;
  //   },
  //   SET_USERNAME: (state, username) => {
  //     state.username = username
  //   },
  //   SET_NICKNAME: (state, nickname) => {
  //     state.nickname = nickname
  //   },
  //   SET_AVATAR: (state, avatar) => {
  //     state.avatar = avatar
  //   },
  //   SET_ID: (state, id) => {
  //     state.id = id
  //   },
  //   SET_CREATE_TIME: (state, create_time) => {
  //     state.create_time = create_time
  //   },
  //   SET_EMAIL: (state, email) => {
  //     state.email = email
  //   },
  //   SET_IS_LOGIN: (state, isLogin) => {
  //     state.isLogin = isLogin
  //   },
  //   SET_ROLE: (state, role) => {
  //     state.role = role
  //   },
  // },
  // getters:{
  //   get_token: state => state.token,
  //   get_username: state => state.username,
  //   get_nickname: state => state.nickname,
  //   get_avatar: state => state.avatar,
  //   get_id: state => state.id,
  //   get_create_time: state=>state.create_time,
  //   get_email: state => state.email,
  //   get_is_login: state => state.isLogin,
  //   get_role: state=>state.role
  // },
  // state:defaultState,
  // mutations:defaultMutations,
  // getters:defaultGetters,
  // actions:defaultActions
  // actions: {
  //   login({commit}, user) {
  //     return new Promise((resolve, reject) => {
  //       login(user.username, user.password).then(res => {
  //         console.log(res.data)
  //         let  time =new Date().setDate(new Date().getDate() + parseInt(res.data.expireTime)/(1000*60*60*24))
  //         console.log(time)
  //         setToken(res.data.token)
  //         console.log(res)
  //         commit('SET_TOKEN',  res.data.token)
  //         commit('SET_USERNAME',  res.data.user.username)
  //         commit('SET_NICKNAME', res.data.user.nickname)
  //         commit('SET_AVATAR', res.data.user.avatar)
  //         commit('SET_ID', res.data.user.id)
  //         commit('SET_CREATE_TIME', res.data.user.create_time)
  //         commit('SET_EMAIL', res.data.user.email)
  //         commit('SET_IS_LOGIN', true)
  //         commit('SET_ROLE', res.data.user.role)
  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },
  //   // // 获取用户信息
  //   // getUserInfo({commit, state}) {
  //   //   let that = this
  //   //   return new Promise((resolve, reject) => {
  //   //     getUserInfo().then(res => {
  //   //       if (data.data) {
  //   //         console.log(res)
  //   //         commit('SET_USERNAME', res.data.username)
  //   //         commit('SET_NICKNAME', res.data.nickname)
  //   //         commit('SET_AVATAR', res.data.avatar)
  //   //         commit('SET_ID',res.data.id)
  //   //         commit('SET_CREATE_TIME', res.data.create_time)
  //   //         commit('SET_EMAIL', res.data.email)
  //   //       } else {
  //   //         commit('SET_USERNAME', '')
  //   //         commit('SET_NICKNAME', '')
  //   //         commit('SET_AVATAR', '')
  //   //         commit('SET_ID', '')
  //   //         commit('SET_CREATE_TIME', '')
  //   //         commit('SET_EMAIL', '')
  //   //         removeToken()
  //   //       }
  //   //       resolve(data)
  //   //     }).catch(error => {
  //   //       reject(error)
  //   //     })
  //   //   })
  //   // },
  //   // 退出
  //   logout({commit, state},username) {
  //     return new Promise((resolve, reject) => {
  //       logout(username).then(data => {
  //         commit('SET_TOKEN', '')
  //         commit('SET_USERNAME', '')
  //         commit('SET_NICKNAME', '')
  //         commit('SET_AVATAR', '')
  //         commit('SET_ID', '')
  //         commit('SET_CREATE_TIME', '')
  //         commit('SET_EMAIL', '')
  //         commit('SET_IS_LOGIN', false)
  //         commit('SET_ROLE', '')
  //         removeToken()
  //         resolve()
  //
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },
  //   // // 前端 登出
  //   // fedLogOut({commit}) {
  //   //   return new Promise(resolve => {
  //   //     commit('SET_TOKEN', '')
  //   //     commit('SET_USERNAME', '')
  //   //     commit('SET_NICKNAME', '')
  //   //     commit('SET_AVATAR', '')
  //   //     commit('SET_ID', '')
  //   //     commit('SET_CREATE_TIME', '')
  //   //     commit('SET_EMAIL', '')
  //   //     commit('SET_IS_LOGIN', false)
  //   //     localStorage.removeItem("token")
  //   //     resolve()
  //   //   }).catch(error => {
  //   //     reject(error)
  //   //   })
  //   // },
  //   register({commit}, user) {
  //     return new Promise((resolve, reject) => {
  //       register(user.username, user.password, user.email,user.vercode).then((res) => {
  //         console.log(res)
  //         if(res.code===state_code.MODIFICATION_SUCCESS){
  //
  //         }else {
  //           throw error.message(res.message)
  //         }
  //
  //
  //         resolve()
  //       }).catch((error) => {
  //         reject(error)
  //       })
  //     })
  //   },
  //   sendvercode({commit},email) {
  //     return new Promise((resolve, reject) => {
  //       sendvercode(email).then((res) => {
  //
  //         resolve()
  //         console.log(res.code)
  //         return res.code
  //       }).catch((error) => {
  //         reject(error)
  //         return error
  //       })
  //     })
  //   }
  // }
})

export default store
