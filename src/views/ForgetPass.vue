<template>
  <el-container v-title :data-title=title>
    <el-header style="background-color:gray;"><h1>找回密码</h1></el-header>
    <el-main style="height: 600px">
  <div id="register" style="width: 50%;margin-left: 25%;: 50%">
    <div class="me-login-box me-login-box-radius" style="margin-top: 25%">
      <div v-if="flag">
        <el-form style="width: 50%;margin-left: 25%" :rules="rules">
          <el-form-item prop="email" >
            <el-input placeholder="电子邮件" v-model="email"></el-input>
          </el-form-item>
          <el-form-item prop="vercode">
            <el-input placeholder="验证码" v-model="vercode"></el-input>
          </el-form-item>
        </el-form>
        <el-col>
            <el-button type="warning" size="small" @click.native.prevent="getVercode()">发送验证码</el-button>
            <el-button type="success" size="small" @click.native.prevent="switchPage1">确认</el-button>

        </el-col>
      </div>
      <div v-if="!flag">
      <el-form ref="userForm" :rules="rules" style="width: 50%;margin-left: 25%" >
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" v-model="password" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="重复密码" v-model="repeatPass" type="password"></el-input>
        </el-form-item>
      </el-form>
        <el-col>
            <el-button type="success" size="small" @click.native.prevent="resetPass()">重置密码</el-button>
            <el-button type="primary" size="small" @click.native.prevent="switchPage2">返回上一步</el-button>

        </el-col>
      </div>


    </div>
  </div>
    </el-main>
    <el-footer>

        <p>Designed by
          <strong>
            <router-link to="/" class="me-login-design-color">YUTONG</router-link>
          </strong>
        </p>

    </el-footer>
  </el-container>
</template>

<script>
import {sendvercode} from "@/api/login";
import {sleep, state_code} from "../../public/property";
import request from "@/utils/request";
import router from "@/router";
export default {
  name: "ForgetPass",
  data() {

    return {
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ],
        vercode: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {size:6, message: '长度应为6个数字', trigger: 'blur'}
        ]
      },
      flag:true,
      username: '',
      email: '',
      password: '',
      vercode: '',
      repeatPass:''
    }
  },
  computed:{
    title(){
      return '忘记密码'
    }


  },

  methods: {
    getVercode() {
      sendvercode(this.email).then(res => {
        console.log(res)
        if (res.code === state_code.MAIL_SUCCESS) {
          this.$message({message: res.message, type: 'success', showClose: true});
        } else {
          console.log(res.message)
          this.$message({message: res.message, type: 'error', showClose: true});
        }

      })
    },
    resetPass(){
      let data={
        username:this.username,
        password:this.password,
        email:this.email,
        vercode:this.vercode
      }

        request.put("/users/resetPassword",data).then(res=>{
          if(res.code===state_code.MODIFICATION_SUCCESS){
            console.log(res)
            this.$message({type:"success",message:res.message,showClose:true});
            this.$notify({
              title: '标题名称',
              message: '3秒后将自动跳转到登录页面',
              duration: 2999
            });
            sleep(3000).then(()=>{
              router.push("/register")
            })


          }else{
            this.$message({type:"error",message:res.message,showClose:true});
          }


        })

    },
    switchPage1(){
      if(this.vercode!==''){
        let a = !this.flag;
        this.flag=a;
      }else {
        this.$message({message:"请输入验证吗",type:'error',showClose:true})
      }

    },
    switchPage2(){
      let a = !this.flag;
      this.flag=a;

    }
  }
}
</script>

<style scoped>

</style>
