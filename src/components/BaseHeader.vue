<template>
  <el-header class="me-area">
    <el-row class="me-header">
      <el-col :span="4" class="me-header-left">
        <router-link to="/" class="me-title">
          <img src="../assets/imgs/mylogo.jpeg" style="width: 40px;height: 60px"/>
        </router-link>
      </el-col>
      <el-col v-if="!simple" :span="16">
        <el-menu :router=true menu-trigger="click" active-text-color="#5FB878" :default-active="activeIndex"
                 mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/category">分类</el-menu-item>
          <el-menu-item index="/messageBoard">留言板</el-menu-item>
          <el-col :span="4" :offset="4">
            <el-menu-item index="/write"><i class="el-icon-edit"></i>写文章</el-menu-item>
          </el-col>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#5FB878">
          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu index>
              <template slot="title">
                <el-avatar  :src="user.avatar"></el-avatar>
              </template>
              <el-menu-item><i class="el-icon-user"></i>{{user.nickname}}</el-menu-item>
              <el-menu-item v-if="$store.getters.get_role==='role_admin'" index="/admin"><i class="el-icon-lock"></i>管理员后台</el-menu-item>
              <el-menu-item @click="goUserInfo($store.state.id)"><i class="el-icon-info"></i>个人信息</el-menu-item>
              <el-menu-item @click="logout"><i class="el-icon-back"></i>退出</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>

    </el-row>
  </el-header>
</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../public/property";

export default {
  name: "BaseHeader",
  methods:{
    logout() {
      let that = this
      this.$store.dispatch('logout',this.$store.state.username).then(() => {
        this.$router.push({path: '/'})
        location.reload()
      }).catch((error) => {
        if (error !== 'error') {
          that.$message({message: error, type: 'error', showClose: true});
        }
      })
    },
    goUserInfo(id){
      console.log(id)
      this.$router.push('/userInfo/'+this.$store.state.id)

    }

  },
  props: {
    activeIndex: String,
    simple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    user() {
      let login = this.$store.getters.get_is_login
      let avatar = this.$store.getters.get_avatar
      let userId = this.$store.getters.get_id
      let nickname = this.$store.getters.get_nickname
      return {
        login, avatar,userId,nickname
      }
    }
  },
  mounted() {

  },
  created() {

  },
  data(){
    return{


    }
  }
}
</script>

<style>
.el-header {

  position: fixed;
  z-index: 1024;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
}

.me-title {
  margin-top: 10px;
  font-size: 24px;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}
.me-area{
  width: 100%;
}

</style>
