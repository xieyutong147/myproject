<template>
  <el-container style="margin-left: 30%">
    <el-col>
      <div v-for="(item,index) in items" :key="index">
        <el-card style="width: 500px;margin-top: 50px;height: 200px">
          <div slot="header" style="height: 25px" >
            <el-col>
              <i class="el-icon-message" style="float: left;padding-top:10px"></i>
              <h3 style="float: left;margin-left: 10px;padding-top: 4px">{{item.title}}</h3>
              <span style="float: right">创建日期:{{item.createTime}}</span>

            </el-col>
          </div>
          <div slot="default" style="float: left;height: 400px">
            <el-col>
              <div style="width: 250px">{{ item.title }}</div>
            </el-col>
            <el-col style="margin-top: 20px">
              <div style="width: 300px">{{ item.content }}</div>
            </el-col>
            <el-col style="float: bottom">
              <el-button style="float:right;margin-right: 5px" @click="$router.push('/posts/'+item.id)">前往正文</el-button>
            </el-col>
          </div>

        </el-card>
      </div>
      <el-pagination
          :current-page.sync="current_page"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total">
      </el-pagination>
    </el-col>

  </el-container>

</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../../public/property";
import moment from "moment";
export default {
  name: "OneItem",
  data(){
    return{
      category_id:this.$route.params.id,
      items:[],
      total:0,
      current_page:1,
      pageSize:2
    }

  },
  methods:{
    handleCurrentChange(){
      this.getPostByTypeId(this.current_page,this.pageSize)
    },
    getPostByTypeId(currentPage,pageSize){
      request.get('/communitys/getPostByTypeId/'+this.category_id+'/'+currentPage+'/'+pageSize).then(res=>{
        if(res.code===state_code.HANDLE_SUCCESS){
          this.items=res.data.records
          this.total=res.data.total
          this.pageSize=res.data.size
          console.log(res)
          console.log(this.total)
          this.items.forEach((item)=>{
            item.createTime=moment(item.createTime).format("YYYY-MM-DD")
          })

        }
      })
    }
  },
  created() {
    this.getPostByTypeId(1,this.pageSize)
  }
}
</script>

<style scoped>

</style>
