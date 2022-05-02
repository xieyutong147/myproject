import axios from 'axios'
import {localStorageGet} from '@/utils/localdb'
import store from '@/store'
import {getToken} from "@/utils/token";
import {state_code} from "../../public/property";
import message from "element-ui/packages/message";
import router from "@/router";
const request = axios.create({
	baseURL: 'http://localhost:8081/api',
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    if(typeof store.getters.get_token!='undefined'&&store.getters.get_token!=null){
        config.headers['token'] = store.getters.get_token
    }else {
        config.headers['token'] = ''
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(

    response => {
        // //全局统一处理 Session超时
        // if (response.headers['session_time_out'] == 'timeout') {
        //     store.dispatch('fedLogOut')
        // }
        let res = response.data;
        if(res.code===state_code.TOKEN_EXPIRED){
            message.error(res.message)
            router.push('/login').then(r => {})

        }
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        if (res.code === state_code.TOKEN_EXPIRED) {
            console.error("token过期，重新登录")
            router.push("/login")
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

