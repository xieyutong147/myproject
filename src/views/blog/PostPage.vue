<template>
    <el-container  style="width: 100%;height: 100%">
      <div>
      <el-card style="width: 800px;height:500px ">
        <div slot="header" class="clearfix">
          <span>帖子信息</span>
          <p style="float: right">发布于&nbsp:{{createTime}}</p>
        </div>
        <el-col>
          <h2>
            标题
          </h2><br/>
          {{post_info.title}}
        </el-col>
        <el-col style="margin-top: 20px">
          <h1>
            描述
          </h1><br/>
          {{post_info.description}}
        </el-col>
        <el-col style="margin-top: 50px">
          <h1>
            内容
          </h1><br/>
          {{post_info.content}}
        </el-col>
      </el-card>
        <el-collapse v-model="activeNames" style="width: 400px;margin-top: 20px;height: 500px;">
          <el-collapse-item title="评论" name="1"  style="overflow: auto;padding-left: 5px;text-align：center">
            <ul class="ul-style"  style="overflow:auto">
              <div v-for="(item,index) in comments" :key="index">
                <el-col>
                  <el-card style="margin-top: 5px">
                    <div slot="header" class="clearfix">
                      <span style="padding:5px 5px 5px 10px">来自: {{item.nickname}}</span>
                      <el-avatar :src="item.avatar" style="float: right;" size="mini"></el-avatar>
                    </div>

                    <p>{{item.content}}</p>
                    <el-tooltip effect="dark" content="点赞" placement="top-start" v-if="getShowButton(index)">
                      <el-badge :value="item.likePoint" :max="99" >
                        <el-button style="margin-top: 2px;"
                                   :icon="icon"
                                   type="info"
                                   size="mini"
                                   @click="dianzan(item,index)"
                                   v-if="getShowButton(index)"
                        >
                        </el-button>
                      </el-badge>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="取消点赞" placement="top-start" v-if="!getShowButton(index)">
                      <el-badge :value="item.likePoint" :max="99" >
                        <el-button style="margin-top: 2px;"
                                   :icon="icon"
                                   type="info"
                                   size="mini"
                                   @click="quxiao_dianzan(item,index)"
                                   v-if="!getShowButton(index)"
                        >
                        </el-button>
                      </el-badge>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除此评论" placement="top-start" v-if="panduan(item)">
                      <el-button style="margin-top: 2px;margin-left: 20px"
                                 icon="el-icon-delete-solid"
                                 type="warning" v-if="panduan(item)"
                                 size="mini"
                      >
                      </el-button>
                    </el-tooltip>
                  </el-card>
                </el-col>
              </div>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
      <el-aside  style="height: 80%;width: 30%;margin-left: 2%">
        <el-card style="height: 200px;margin-right: 150px">
          <div slot="header" class="clearfix">
            <span style="padding:5px 5px 5px 10px">发帖人: {{user_info.nickname}}</span>
              <el-avatar :src="user_info.avatar" style="float: right;" size="mini"></el-avatar>
          </div>
          <el-col>用户名:&nbsp{{user_info.username}}</el-col>
          <el-col style="margin-top: 20px">Email:&nbsp{{user_info.email}}</el-col>

        </el-card>
        <el-card style="margin-top: 5px ;width: 400px">
          <div slot="header" class="clearfix">
            <span>添加评论</span>
          </div>
          <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="inputArea">
          </el-input>
          <el-row style="margin-left: 25%;margin-top: 5px">
            <el-button icon="el-icon-upload" :loading="flag2" type="primary" @click="addComment">发布</el-button>
            <el-button icon="el-icon-delete" style="margin-left: 20px" type="danger" @click="qingkong">清空</el-button>
          </el-row>
        </el-card>
      </el-aside>
    </el-container>



</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../../public/property";
import moment from "moment";


export default {
  name: "PostPage",
  data(){
    return{
      activeNames: ['1'],
      count: 0,
      post_id:this.$route.params.id,
      post_info: {},
      user_info:{},
      createTime:'',
      comments:[],
      icon:"el-icon-star-off",
      showButton:[],
      inputArea:'',
      flag2:false

    }

  },
  methods:{
    ifshow(item){
      return item.status === 1;
    },
    qingkong(){
      this.inputArea=''
    },
    panduan(item){
      if(item.userId===this.$store.getters.get_id){
        return true
      }else if(this.$store.getters==="role_admin"){
        console.log(this.$store.getters)
        return true
      }else {
        return false
      }
    },
    addComment(){
      this.flag2=true
      let data={
        content:this.inputArea,
        communityId:this.post_id,
        parentCommentId:-1

      }
      request.post('/comments/addComment',data).then(res=>{
        if(res.code===state_code.MODIFICATION_SUCCESS){
          request.get("/comments/getComment/"+this.post_id).then(data=>{
            console.log(data.data)
            if(data.code===state_code.HANDLE_SUCCESS){
              this.comments=data.data
              this.comments.forEach((item,index)=>{
                if(item.status===-1){
                  this.comments.splice(index,1)
                }
              })

              for (let i = 0; i < this.comments.length; i++) {
                this.showButton[i]=true
              }
              console.log(this.showButton)
            }else {
              this.$message({type:"error",message:data.message})
            }}
          )
          this.flag2=false
          this.$message({type:'success',message:res.message})
          this.inputArea=''
        }else {
          this.flag2=false
          this.$message({type:'error',message:res.message})
        }
      })
    },
    getPostInfo(){
      let uid;
      request.get("/communitys/getPostById/"+this.post_id).then(res=> {
        if (res.code === state_code.HANDLE_SUCCESS) {
          this.post_info = res.data
          uid = res.data.userId
          request.get("/users/getUserInfo/"+uid).then(res=>{
            if(res.code===state_code.HANDLE_SUCCESS){
              this.user_info=res.data
              this.createTime=moment(res.data.createTime).format("YYYY-MM-DD")
            }else{
              this.$message.error(res.message)
            }
          })
          request.get("/comments/getComment/"+this.post_id).then(res=>{
            if(res.code===state_code.HANDLE_SUCCESS){
              this.comments=res.data
              for (let i = 0; i < this.comments.length; i++) {
                 this.showButton[i]=true
              }
              console.log(this.showButton)
            }else {
              this.$message({type:"error",message:res.message})
            }

          })
        }else {
          this.$message({type:"error",message:res.message})
        }
      })

  },
    getShowButton(index){
      return this.showButton[index]
    },
  handleChange(){

  },
    dianzan(item,index){
      request.put('/comments/addLikePoint/'+item.id+'/'+this.$store.getters.get_id).then(res=>{
        if(res.code===state_code.MODIFICATION_SUCCESS){
          this.$message({type:"success",message:res.message})
          item.likePoint+=1
          this.showButton[index]=false
          this.icon='el-icon-star-on'
        }else {
          this.$message({type:"error",message:res.message})
        }
      })
    },
    quxiao_dianzan(item,index){
      request.delete('/comments/deleteLikePoint/'+item.id+'/'+this.$store.getters.get_id).then(res=>{
        if(res.code===state_code.MODIFICATION_SUCCESS){
          this.$message({type:"success",message:res.message})
          item.likePoint-=1
          this.showButton[index]=true
          this.icon='el-icon-star-off'
        }else {
          this.$message({type:"error",message:res.message})
        }
      })
    }


},
  mounted() {
    this.getPostInfo()
  }
}

</script>

<style scoped>
body{
  display: flex;
}
.ul-style{
  overflow-x: scroll;
  white-space: nowrap;

}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
</style>
