<template>
  <div id="login" v-title :data-title=title>
    <div class="me-login-box me-login-box-radius">
      <h1>登录</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="userForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="login('userForm')">登录</el-button>
        </el-form-item>
        <el-form-item size="small" class="me-login-button">
          <el-button type="danger" @click = "goTo('/forgetPass')">忘记密码</el-button>
        </el-form-item>
      </el-form>


    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../public/property";
import {SET_TOKEN} from "@/store/mutation-types";
import store from "@/store";
import {Message} from "element-ui";
import {setToken} from "@/utils/token";
import {localStorageGet, localStorageSet} from "@/utils/localdb";

export default {
  name: "Login",
  data(){
    return {
      userForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ]
      }
    }

  },
  computed:{
    title(){
      return '登录'
    }

  },

  methods: {
    login(formName) {
      let that = this

      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$store.dispatch('login', that.userForm).then(res => {
            if(res===true){
              that.$router.go(-1)
            }else {
              that.$notify({message: '请重试', type: 'info', showClose: true});
            }
            //
          }).catch((error) => {
            if (error !== 'error') {
              that.$message({message: error, type: 'error', showClose: true});
            }
          })

        } else {
          return false;
        }
      });
    },
    goTo(path){
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
#login {
  min-width: 100%;
  min-height: 100%;
}

.me-video-player {
  background-color: transparent;
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  position: absolute;
  left: 0;
  z-index: 0;
  top: 0;
}

.me-login-box {
  position: absolute;
  width: 300px;
  height: 260px;
  background-color: white;
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding: 30px;
}

.me-login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
}

.me-login-design-color {
  color: #5FB878 !important;
}

.me-login-button {
  text-align: center;
  width: 40%;
  margin-left: 30%;
}

.me-login-button button {
  width: 100%;
}
</style>
