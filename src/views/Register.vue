<template>
  <div id="register" v-title data-title="注册">
    <div class="me-login-box me-login-box-radius">
      <h1>注册</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="电子邮件" v-model="userForm.email"></el-input>
        </el-form-item>

        <el-form-item prop="vercode">
          <el-input placeholder="验证码" v-model="userForm.vercode"></el-input>
        </el-form-item>
        <el-form-item size="small" class="me-login-button">
          <el-button type="warning" @click.native.prevent="getVercode('userForm')">发送验证码</el-button>
        </el-form-item>
        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="register('userForm')">注册</el-button>
        </el-form-item>

      </el-form>

      <div class="me-login-design">
        <p>Designed by
          <strong>
            <router-link to="/" class="me-login-design-color">YUTONG</router-link>
          </strong>
        </p>
      </div>

    </div>
  </div>
</template>

<script>


import {sendvercode} from "@/api/login";
import {state_code} from "../../public/property";

export default {
  name: 'Register',
  data() {
    return {
      userForm: {
        username: '',
        email: '',
        password: '',
        vercode:''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮件', trigger: 'blur'},
          {type:"email", trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 20, message: '不能大于20个字符', trigger: 'blur'}
        ],
        vercode: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {size:6, message: '应为6个字符', trigger: 'blur'}
        ]
      }

    }
  },
  computed:{
    title(){
      return "注册"
    }
  },
  methods: {
    getVercode(){
      sendvercode(this.userForm.email).then(res=>{
        console.log(res)
        if(res.code===state_code.MAIL_SUCCESS){
          this.$message({message: res.message, type: 'success', showClose: true});
        }else {
          console.log(res.message)
          this.$message({message: res.message, type: 'error', showClose: true});
        }

      })

    },
    register(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$store.dispatch('register', that.userForm).then(() => {
            that.$message({message: '注册成功', type: 'success', showClose: true});
            that.$router.push({path: '/'})
          }).catch((error) => {
            if (error !== 'error') {
              that.$message({message: error, type: 'error', showClose: true});
            }
          })

        } else {
          return false;
        }
      });

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
  height: 420px;
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
