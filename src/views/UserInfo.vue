<template>
  <el-container v-title :data-title="title">
    <el-header><BaseHeader></BaseHeader></el-header>
    <el-main style="margin: 200px 25% 140px;height: 300px;">
      <el-card style="height: 70%;border-radius:30px">
        <el-descriptions title="用户信息">
          <el-descriptions-item label="头像">
            <el-avatar :src="Info.avatar" ></el-avatar>
          </el-descriptions-item>
          <el-descriptions-item label="昵称">{{ Info.nickname }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ Info.email }}</el-descriptions-item>
          <el-descriptions-item label="注册日期">{{createTime}}</el-descriptions-item>
          <el-descriptions-item label="用户类别">{{roles}}</el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-col style="margin-top: 10px">
        <el-button style="margin-left: 30%" @click="changeUserInfo()" type="info">修改个人信息</el-button>
        <el-button @click="changePass()" type="warning">修改密码</el-button>
      </el-col>
      <el-dialog title="上传头像" :visible.sync="uploadflag" style="width: 50%;margin-left: 25%">
        <el-upload
            class="upload-demo"
            :action="action_url"
            name="avatar"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :on-success="uploadSuccess"
            :onError="uploadError"
            :headers=header
            show-file-list
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
      <el-dialog title="修改个人信息" :visible.sync="flag">
        <el-form :model="form" :rules="rules">
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-button @click="changeUpload">点此上传</el-button>
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Email" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="flag = false">取 消</el-button>
          <el-button type="primary" @click="submit1">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改密码" :visible.sync="flag1">
        <el-form :model="form1" :rules="rules">
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form1.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="重复密码" :label-width="formLabelWidth">
            <el-input v-model="form1.repeatPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="flag1 = false">取 消</el-button>
          <el-button type="primary" @click="submit2">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import request from "@/utils/request";
import {state_code} from "../../public/property";
import moment from "moment"
import BaseHeader from "@/components/BaseHeader";
import store from "@/store";

export default {
  name: "UserInfo",
  components:{
    BaseHeader
  },
  data(){
    return{
      userId:this.$route.params.id,
      Info:[],
      createTime:"",
      roles:"",
      flag:false,
      flag1:false,
      uploadflag:false,
      header:{
        token:store.getters.get_token
      },
      formLabelWidth: '120px',
      fileList:[],
      form:{
        username:store.getters.get_username,
        nickname:store.getters.get_nickname,
        email:store.getters.get_email,
        avatar:""
      },
      action_url:"http://localhost:8081/api/files/uploadAvatar/"+store.getters.get_username,
      form1:{
        username:store.getters.get_username,
        password:"",
        repeatPass:""
      },
      rules:{
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ],
        repeatPass: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ]
      }

    }

  },
  computed: {
    title (){
      return '用户信息'
    }
  },
  methods:{
    uploadSuccess(response, file, fileList){
        console.log(response)
        store.commit("SET_AVATAR",response.data)
        this.Info.avatar=response.data
    },
    uploadError(err, file, fileList) {
      if (err.message !== "") {
        this.$message.warning(err.message);
      } else {
        this.$message.warning("网络错误，不能访问");
      }
    },
    changeUpload(){
      this.uploadflag=true
    },

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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    changeUserInfo(){
        this.flag=true
    },
    changePass(){
      this.flag1=true
    },
    submit2(){
      let data={
        username:store.getters.get_username,
        password:this.form1.password
      }
      if(this.form1.password===this.form1.repeatPass){
          request.post('/users/changePass',data).then(res=>{
            if(res.code===state_code.MODIFICATION_SUCCESS){
              this.$notify({
                type:"success",
                message:res.message,
                duration:3000
              })
              this.flag1=false
            }else {
              this.$notify({
                type:"error",
                message:res.message,
                duration:3000
              })
            }
          })

      }else {
        this.$message({type:"error",message:"两次密码不一样,请重试"},)
      }



    },
    submit1(){
      let data={
        id:store.getters.get_id,
        username:this.form.username,
        email: this.form.email,
        nickname: this.form.nickname,
      }
      request.put('/users/modifyUserInfo',data).then(res=>{
        if(res.code===state_code.MODIFICATION_SUCCESS){
          this.$notify({
            title: '提示',
            message: res.message,
            duration: 1000,
            type: 'success',
            showClose: false
          });
          store.commit("SET_NICKNAME",data.nickname)
          this.Info.nickname=data.nickname
          store.commit("SET_EMAIL",data.email)
          this.Info.email=data.email
          store.commit("SET_USERNAME",data.username)
          this.Info.username=data.username
        }else {
          this.$notify({
            title: '提示',
            message: res.message,
            duration: 1000,
            type: 'success',
            showClose: false
          });
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
