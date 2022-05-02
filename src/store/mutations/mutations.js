import {localStorageSet} from "@/utils/localdb";

export const defaultMutations={
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_CREATE_TIME: (state, create_time) => {
    state.create_time = create_time
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_IS_LOGIN: (state, isLogin) => {
    state.isLogin = isLogin
    localStorageSet("isLogin","true",new Date().setDate(new Date().getDate() + 7))
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
}
