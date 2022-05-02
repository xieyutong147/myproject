<template>
    <el-container style="margin-left: 25%">
    <div>
      <el-col>
        <div>
          <div>
            <p style="float: left">选择主题</p>
            <el-select v-model="fenlei"  filterable
                       allow-create
                       default-first-option
                       placeholder="请选择" style="float:left;margin-left: 20px" >
              <el-option
                  v-for="(item,index) in options "
                  :key="index"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="没有你想要的主题,点一下试试吧" placement="top">
              <el-button type="info" icon="el-icon-circle-plus" style="float: left;margin-left: 20px" @click="addFeilei" circle></el-button>
            </el-tooltip>
            <el-dialog title="添加分类" :visible.sync="flag">
              <el-form :model="form">
                <el-form-item label="主题名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="createFeilei">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-col>
      <el-col>
      <el-form >
        <el-form-item label="标题">
          <el-input v-model="tiezi.title"
                    placeholder="标题"
                    clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="tiezi.description"
                    type="textarea"
                    :row="5"
                    placeholder="描述"
                     clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="tiezi.content"
                    type="textarea"
                    :row="5"
                    placeholder="内容"
                    clearable></el-input>
        </el-form-item>
      </el-form>
        <el-upload
            class="upload-demo"
            :action="action_url"
            name="picture"
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
          <el-button round @click="publish(tiezi,fenlei,$store.state.username)">发布</el-button>

      </el-col>

    </div>
      <div  v-if="pic_url.length!==0" style="margin-left: 10%;margin-top: 30%">
        <h3>预览框</h3>
        <el-image style="width: 100px; height: 100px"
                  :src="pic_url"
                  fit="scale-down"
        >

        </el-image>
      </div>
  </el-container>
</template>

<script>
import request from "@/utils/request";
import {sleep, state_code} from "../../../public/property";
import message from "element-ui/packages/message";
import store from "@/store";
export default {
  name: "WritePost",

  data(){
    let that = this
    return{
      options:[],
      action_url:"http://localhost:8081/api/files/uploadPicture",
      formLabelWidth: '120px',
      flag:false,
      uploadflag:false,
      header:{
        token:store.getters.get_token
      },
      pic_url:'',
      fileList:[],
      fenlei:"",
      tiezi:{
        username:"",
        title:"",
        description:"",
        content:"",
        // picture:"",
        typeName:"",
        picture:""
      },
      form:{
        name:""
      }


    }

  },
  methods:{
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
    uploadSuccess(response, file, fileList){
      this.pic_url=response.data
      console.log(response)
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
    publish(tiezi,fenlei,username){
              tiezi.typeName=fenlei,
              tiezi.username=username,
              tiezi.picture=this.pic_url
              console.log(tiezi)
        if(!this.options.includes(fenlei)){
          console.log(fenlei)
          let a= true
          request.post("/types/addTypes/"+fenlei).then(res=>{
            if(res.code===state_code.MODIFICATION_SUCCESS){

            }else {
              a=false
            }
          })
          console.log(a)
          if(!a){
            this.$message({type:"error",message:'出错了,没有该类别',duration:2000})
            return
          }
        }
        request.post("/communitys/addPost",tiezi).then(res=>{
          if(res.code===state_code.MODIFICATION_SUCCESS){
            this.$notify({
              title: '通知',
              message: res.message,
              type: 'success'
            })
            console.log(res)
          }else {
            console.log(res)
            this.$notify({
              title: '警告',
              message: res.message,
              type: 'warning'
            })
          }

        })
    },
    getType(){
      return request.get("/types/getTypes/"+"-1")
    },
    addFeilei(){
        this.flag = true
    },
    createFeilei(){
      request.post("/types/addTypes/"+this.form.name).then(res=>{
        if(res.code===state_code.MODIFICATION_SUCCESS){
          this.$message({type:"success",message:res.message,showClose:true})
          this.options.push({
            value: res.data,
            label: res.data
          })

        }
      })
      sleep(3000)
      this.flag=false
    },


  },
  mounted() {
    let size=0;
    this.getType().then(res=>{
      console.log(res)
      size=res.data.length;
      let arr = new Array(size);
      for (let i = 0; i < res.data.length; i++) {
        arr[i]={
          value: res.data[i].typeName,
          label: ''
        }
      }
      this.options=arr
      console.log(this.options)
    })
  }

}
</script>

<style scoped>

</style>
