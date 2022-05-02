<template>
  <div v-title data-title="管理员后台" style="height: 100%">
    <el-container style="width: 100%;">
      <el-main style="margin-top: 2%;width:820px">
        <el-page-header @back="goBack" content="管理界面" style="margin-top: 5%">
        </el-page-header>
        <el-tabs type="border-card"  style="margin-top: 5%" >
       <el-tab-pane label="用户管理" >
            <el-table
                :data="user_data"
                border
                class="tb-edit"
                style="width: 100%"
                highlight-current-row
                @row-click="handleCurrentChange">
              <el-table-column
                  prop="id"
                  label="id"
                  width="50">
              </el-table-column>
              <el-table-column
                  label="用户名"
                  width="100">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.username" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.username}}</span>
                </template>
              </el-table-column>

              <el-table-column
                  label="邮件"
                  width="150"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.email" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.email}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="注册时间"
                  width="100"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.createTime" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.createTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="status"
                  label="状态"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  label="操作"
                  fixed="right">
                <template slot-scope="scope">
                  <el-button type="text"  @click="pwdChange(scope.row,scope.$index,true)">
                                {{scope.row.isSet?'保存':"修改"}}
                  </el-button>
                  <el-button v-if="scope.row.status==='正常'" type="danger" size="small">封禁</el-button>
                  <el-button v-else type="info" size="small">解封</el-button>
                  <el-button type="warning" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="size1">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="帖子管理">
            <el-table
                :data="post_data"
                border
                class="tb-edit"
                style="width: 100%"
                highlight-current-row
                @row-click="handleCurrentChange"
            >
              <el-table-column
                  prop="id"
                  label="id"
                  width="50">
              </el-table-column>
              <el-table-column
                  label="标题"
                  width="100">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.title" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.title}}</span>
                </template>
              </el-table-column>

              <el-table-column
                  label="描述"
                  width="150"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.description" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.description}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="发帖时间"
                  width="100"
              >
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.createTime" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.createTime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="status"
                  label="状态"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  label="操作"
                  fixed="right">
                <template slot-scope="scope">
                  <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
                                {{scope.row.isSet?'保存':"修改"}}
                  </span>
                  <el-button type="primary" size="small" @click="$router.push('/posts/'+scope.row.id)">查看</el-button>
                  <el-button v-if="scope.row.status==='正常'" type="danger" size="small">封禁</el-button>
                  <el-button v-else type="info" size="small">解封</el-button>
                </template>

              </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange2"
                :current-page.sync="currentPage2"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="size2">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside style="margin-top: 10%;margin-left: 100px">
        <el-card style="height: 200px">
          <div slot="header" class="clearfix">
            <span>一些信息</span>
          </div>
          <el-col>
            <p> 当前用户数:&nbsp;{{size1}}</p>
          </el-col>
          <el-col>
            <p> 当前帖子数:&nbsp;{{ size2 }}</p>
          </el-col>
        </el-card>
      </el-aside>
    </el-container>
  </div>

</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../../public/property";
import moment from "moment";

export default {
  name: "Admin",
  data(){

    return{
      currentTableId:0,
      value: new Date(),
      user_data:[{
        id:'',
        username:'',
        email:'',
        status:'',
        createTime:''
      }],
      post_data:[{
        id:'',
        title:'',
        description:'',
        status:'',
        content:'',
        updateTime:'',
        typeId:'',
        userId:''
      }],
      currentPage1:1,
      currentPage2:1,
      pageSize:3,
      size1:0,
      size2:0
    }

  },
  methods: {

    handleCurrentChange(row, event, column) {
      row.isSet=true
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleCurrentChange1(){
      this.getUser_data(this.currentPage1,this.pageSize)
    },
    handleCurrentChange2(){
      this.getPost_data(this.currentPage2,this.pageSize)    },
    goBack() {
      this.$router.go(-1)
    },
    get_post_num(){
      request.get('/admin/getPostSum').then(res=>{
        if (res.code===state_code.HANDLE_SUCCESS){
          // this.size2=res.data
        }else{
          this.$message({type:'error',message:res.message})
        }
      })
    },
    get_user_num(){
      request.get('/admin/getUserSum').then(res=>{
        if (res.code===state_code.HANDLE_SUCCESS){
          this.size1=res.data
        }else{
          this.$message({type:'error',message:res.message})
        }
      })

    },
    getUser_data(currentPage,pageSize){
      request.get('/admin/getAllUserInfo/'+currentPage+'/'+pageSize).then(res=>{
        if(res.code===state_code.MODIFICATION_SUCCESS){
          this.user_data=res.data.records
          this.size1=res.data.total
          this.user_data.forEach((item)=>{
            item.createTime=moment(item.createTime).format("YYYY-MM-DD")
            item.isSet =false
            item.isEdit = false
            if(item.status===1){
              item.status='正常'
            }else {
              item.status='已被封禁'
            }
          })


        }

      })
    },
    getPost_data(currentPage,pageSize){
      request.post('/communitys/getPost/'+currentPage+'/'+pageSize,{}).then(res=>{
        if(res.code===state_code.HANDLE_SUCCESS){
          this.post_data=res.data.records
          this.size2=res.data.total
          this.post_data.forEach((item)=>{
            item.createTime=moment(item.createTime).format("YYYY-MM-DD")
            item.isSet = false
            item.isEdit = false
            if(item.status===1){
              item.status='正常'
            }else {
              item.status='已被封禁'
            }
          })
        }else{
          this.$message({type:'error',message:res.message})
        }

      })

    }
  },
  created() {
    this.get_user_num()
    this.get_post_num()
    this.getUser_data(1,this.pageSize)
    this.getPost_data(1,this.pageSize)
  }
}
</script>

<style scoped>
body{
  display: flex;
}
.tb-edit .el-input {
  display: none
}
.tb-edit .current-row .el-input {
  display: block
}
.tb-edit .current-row .el-input+span {
  display: none
}
.el-card ::v-deep {
  border-radius: 30px;
}
</style>
