<template>
  <el-main style="width: 500px;height: 700px;">
      <ul class="ul-style" >
        <div v-for="(item,index) in post" :key="item.id">
          <el-card style="height: 52%;margin-top: 10px">
            <div slot="header" style="height: 50px" >
              <el-col>
                <el-col>
                  <el-avatar :src="userInfo[index].avatar" style="float: left"></el-avatar>
                  <p style="float: right;margin-right: 30px">{{ userInfo[index].nickname}}</p>
                </el-col>
              </el-col>
            </div>
            <div slot="default" style="float: left;height: 400px">
              <el-col>
                <div style="width: 200px">{{ item.title }}</div>
              </el-col>
              <el-col>
                <div style="width: 400px;height: 280px">{{ item.content }}</div>
                <el-button size="small" @click="goMainContext(item.id)" class="a">前往正文</el-button>
              </el-col>
            </div>
<!--            <el-button size="small" @click="goMainContext(item.id)" class="a">前往正文</el-button>-->
          </el-card>
        </div>
      </ul>
  </el-main>
</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../../public/property";



export default {
  name: "PostList",
  data(){
    return{
      post:[],
      userInfo:[{
        id:'',
        avatar:'',
        nickname:'',
        email:'',
        createTime:'',
        updateTime:'',
        role:''
      }],

    }
  },
  methods:{
    getPost(){
      if(this.$store.state.isLogin){
        request.get("/communitys/getLastestPost").then(res=>{
          if(res.code===state_code.HANDLE_SUCCESS){
            this.post=res.data
            console.log(res.data)
            console.log(this.post)
            this.post.forEach((item)=>{
              request.get("/users/getUserInfo/"+item.userId).then(res=>{
                if(res.code===state_code.HANDLE_SUCCESS){
                  this.userInfo.push(res.data)
                }else{
                  console.log(res)
                  this.$message.error(res.message)
                }
              })
            })
          }else {
            this.$notify({
              title: '出错啦',
              message: res.message,
              duration: 2000
            });
          }

        })
      }
    },
    goMainContext(id){
        this.$router.push('/posts/'+id)
    }
  },
  created() {
    this.getPost()
  },

}
</script>

<style scoped>
.a{
  margin-top: 2px;
  margin-right: 20px;
  float: right;

}
.ul-style{
  overflow-x: scroll;
  white-space: nowrap;

}
.el-card ::v-deep .el-card__header {

  background-color: palegoldenrod;
}
.el-card ::v-deep {
  border-radius: 30px;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
</style>
