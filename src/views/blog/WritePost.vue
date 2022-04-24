<template>
    <el-container style="margin-left: 10%">
    <div>
      <el-col >
        <div>
          <div>
            <p style="float: left">选择主题</p>
            <el-select v-model="fenlei"  filterable placeholder="请选择"style="float: left;margin-left: 20px" >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-tooltip class="item" effect="dark" content="没有你想要的主题,点一下试试吧" placement="top">
              <el-button type="info" icon="el-icon-circle-plus" style="float: left;margin-left: 20px" @click="addFeilei" circle></el-button>
            </el-tooltip>
          </div>

        </div>

      </el-col>
      <el-col style="height: 50px" >
        <p style="float: left;margin-top: 50px">标题&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </p>
      <el-input
          placeholder="标题"
          v-model="tiezi.title"
          style="padding-top: 40px ;width:40%;float: left;margin-left: 20px"

          clearable>
      </el-input>
      </el-col>
      <el-col style="height: 50px;margin-top:60px" >
        <p style="float: left;margin-top: 50px">描述&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </p>
        <el-input
            placeholder="描述"
            v-model="tiezi.description"
            style="padding-top: 40px ;width:40%;float: left;margin-left: 20px"
            type="textarea"
            :row="5"
            clearable>
        </el-input>
      </el-col>
      <el-col style="height: 50px;margin-top:80px" >
        <p style="float: left;margin-top: 50px">内容&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp </p>
        <el-input
            placeholder="内容"
            v-model="tiezi.content"
            style="padding-top: 40px ;width:40%;float: left;margin-left: 20px"
            type="textarea"
            :row="5"
            clearable>
        </el-input>
      </el-col>
<!--      <div style="margin-top: 20px;margin-left: 30px">-->
<!--        <el-button round @click="publish(tiezi,fenlei,$store.state.username)">发布</el-button>-->
<!--      </div>-->
      <el-col style="height: 20px;margin-top:50px">
        <el-button round @click="publish(tiezi,fenlei,$store.state.username)" style="position: absolute;left: 28%;top:70%">发布</el-button>
      </el-col>
    </div>
      <el-aside>
        <div v-if="flag">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="主题名称:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="createFeilei">立即创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
  </el-container>
</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../../public/property";
import message from "element-ui/packages/message";
let options=[]
export default {
  name: "WritePost",

  data(){
    let that = this
    return{
      options,
      flag:false,
      fenlei:"",
      tiezi:{
        username:"",
        title:"",
        description:"",
        content:"",
        // picture:"",
        typeName:"",
      },
      form:{
        name:""
      }


    }

  },
  methods:{
    publish(tiezi,fenlei,username){
      tiezi.typeName=fenlei,
          tiezi.username=username,
          console.log(tiezi)
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
      request.post("/types//addTypes/"+this.form.name).then(res=>{
        if(res.code===state_code.MODIFICATION_SUCCESS){
          this.$message({type:"success",message:res.message,showClose:true})
          this.options.push({
            value: res.data,
            label: ''
          })
          console.log(this.options)

        }
      })
    }


  },
  created() {
    let size=0;
    this.getType().then(res=>{
      console.log(res)
      size=res.data.length;
      let arr = new Array(size);
      for (let i = 0; i < res.data.length; i++) {
        arr[i]={
          value: res.data[i],
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
