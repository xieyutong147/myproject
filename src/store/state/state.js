import {getIsLOGIN, getToken} from "@/utils/token";

export const defaultState = {
        id: '',
        username: '',
        nickname: 'null',
        avatar: '',
        token: getToken(),
        create_time:'',
        email:"null",
        isLogin:false,
        role:''
     }
