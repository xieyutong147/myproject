import {localStorageSet,localStorageGet} from "@/utils/localdb";
export function getToken() {
    return localStorageGet("token")
}

export function setToken(token,expireTime = new Date().setDate(new Date().getDate() + 7)) {
    return localStorageSet("token",token,expireTime)
}

export function removeToken() {
    return localStorage.removeItem('token')
}
export function setIsLOGIN(flag,expireTime = new Date().setDate(new Date().getDate() + 7)) {
    return localStorageSet("isLogin",flag,expireTime)
}
export function getIsLOGIN() {
   let tmp= localStorageGet("isLogin")
    return tmp === 'true';
}

export function removeIsLOGIN() {
    return localStorage.removeItem('isLogin')
}
