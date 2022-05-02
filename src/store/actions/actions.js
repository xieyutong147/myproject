import {login, logout, register, sendvercode} from "@/api/login";
import {getIsLOGIN, removeIsLOGIN, removeToken, setIsLOGIN, setToken} from "@/utils/token";
import {state_code} from "../../../public/property";
import { Message } from "element-ui";
export const  defaultActions= {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            login(user.username, user.password).then(res => {
                console.log(res)
                if(res.code===state_code.SUCCESS_LOGIN){
                    let  time =new Date().setDate(new Date().getDate() + parseInt(res.data.expireTime)/(1000*60*60*24))
                    setToken(res.data.token)
                    commit('SET_TOKEN',  res.data.token)
                    commit('SET_USERNAME',  res.data.user.username)
                    commit('SET_NICKNAME', res.data.user.nickname)
                    commit('SET_AVATAR', res.data.user.avatar)
                    commit('SET_ID', res.data.user.id)
                    commit('SET_CREATE_TIME', res.data.user.create_time)
                    commit('SET_EMAIL', res.data.user.email)
                    commit('SET_IS_LOGIN', true)
                    commit('SET_ROLE', res.data.user.role)
                    Message({type:"success",message:res.message})
                    resolve(true)
                }else if(res.code===state_code.FAILED_LOGIN){
                    Message({type:"error",message:"登录出错"})
                    resolve(false)
                }

            }).catch(error => {
                reject(error)
            })
        })
    },
    // // 获取用户信息
    // getUserInfo({commit, state}) {
    //   let that = this
    //   return new Promise((resolve, reject) => {
    //     getUserInfo().then(res => {
    //       if (data.data) {
    //         console.log(res)
    //         commit('SET_USERNAME', res.data.username)
    //         commit('SET_NICKNAME', res.data.nickname)
    //         commit('SET_AVATAR', res.data.avatar)
    //         commit('SET_ID',res.data.id)
    //         commit('SET_CREATE_TIME', res.data.create_time)
    //         commit('SET_EMAIL', res.data.email)
    //       } else {
    //         commit('SET_USERNAME', '')
    //         commit('SET_NICKNAME', '')
    //         commit('SET_AVATAR', '')
    //         commit('SET_ID', '')
    //         commit('SET_CREATE_TIME', '')
    //         commit('SET_EMAIL', '')
    //         removeToken()
    //       }
    //       resolve(data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 退出
    logout({commit, state},username) {
        return new Promise((resolve, reject) => {
            logout(username).then(data => {
                commit('SET_TOKEN', '')
                commit('SET_USERNAME', '')
                commit('SET_NICKNAME', '')
                commit('SET_AVATAR', '')
                commit('SET_ID', '')
                commit('SET_CREATE_TIME', '')
                commit('SET_EMAIL', '')
                commit('SET_IS_LOGIN', false)
                commit('SET_ROLE', '')
                removeToken()
                resolve()

            }).catch(error => {
                reject(error)
            })
        })
    },
    // // 前端 登出
    // fedLogOut({commit}) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     commit('SET_USERNAME', '')
    //     commit('SET_NICKNAME', '')
    //     commit('SET_AVATAR', '')
    //     commit('SET_ID', '')
    //     commit('SET_CREATE_TIME', '')
    //     commit('SET_EMAIL', '')
    //     commit('SET_IS_LOGIN', false)
    //     localStorage.removeItem("token")
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // },
    register({commit}, user) {
        return new Promise((resolve, reject) => {
            register(user.username, user.password, user.email,user.vercode).then((res) => {
                console.log(res)
                if(res.code===state_code.MODIFICATION_SUCCESS){

                }else {
                    throw error.message(res.message)
                }


                resolve()
            }).catch((error) => {
                reject(error)
            })
        })
    },
    sendvercode({commit},email) {
        return new Promise((resolve, reject) => {
            sendvercode(email).then((res) => {

                resolve()
                console.log(res.code)
                return res.code
            }).catch((error) => {
                reject(error)
                return error
            })
        })
    }
}
