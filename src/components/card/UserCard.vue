<template>
  <div>
    <el-card style="">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="头像">
          <el-avatar  :src="Info.avatar" ></el-avatar>
        </el-descriptions-item>
        <el-descriptions-item label="昵称">{{ Info.nickname }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ Info.email }}</el-descriptions-item>
        <el-descriptions-item label="注册日期">{{createTime}}</el-descriptions-item>
        <el-descriptions-item label="用户类别">{{roles}}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../../public/property";
import moment from "moment";

export default {
  name: "UserCard",
  data(){
    return{
      userId:this.$route.params.id,
      Info:[],
      createTime:"",
      roles:""
    }
  },
  methods:{
    getInfo(userId){
      console.log(userId)
      request.get("/users/getUserInfo/"+userId).then(res=>{
        if(res.code===state_code.HANDLE_SUCCESS){
          this.Info=res.data
          this.createTime=moment(res.data.createTime).format("YYYY-MM-DD")
          if(res.data.role==='role_user'){
            this.roles="普通用户"
          }else if(res.data.role==='role_admin'){
            this.roles="管理员"
          }else {
            this.roles="游客"
          }

          console.log(this.Info)
        }else{
          this.$message({type:"error",message:res.message})
        }
      })
    }
  },
  created() {
    this.getInfo(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
