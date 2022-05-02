<template>
   <el-container style="width: 1000px">
     <div style="width: 500px;margin-left:40%;margin-top:10%;overflow: auto">
         <el-table
             :data="table_data"
             border
             style="width: 90%">
           <el-table-column
               prop="id"
               label="id"
               >
           </el-table-column>
           <el-table-column
               prop="typeName"
               label="类型"
               >
           </el-table-column>
           <el-table-column
               label="查看"
           >
             <template slot-scope="{row}">
               <el-button type="text" @click="$router.push('/category/'+row.id)">前往查看</el-button>
             </template>
           </el-table-column>
         </el-table>
       <el-pagination
           style="margin-left: 15%;margin-top: 20px"
           @current-change="handleCurrentChange1"
           :current-page.sync="currentPage1"
           :page-size="pageSize"
           layout="prev, pager, next, jumper"
           :total="total">
       </el-pagination>
     </div>
   </el-container>
</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../../public/property";

export default {
  name: "Category",
  data(){
    return{
      currentPage1: 1,
      table_data: [],
      pageSize:3,
      total:0,
    }

  },
  methods: {
    handleCurrentChange1(){
      this.getData(this.currentPage1,this.pageSize)
    },
    getData(currentPage,pageSize) {
      request.get('/types/getAllTypes/'+currentPage+'/'+pageSize).then(res=>{
        if(res.code===state_code.HANDLE_SUCCESS){
          this.table_data=res.data.records
          this.total=res.data.total
          console.log(this.table_data)
        }else {
          this.$message({type:'error',message:res.message})
        }
      })
    },

  },
  mounted() {
    this.getData(this.currentPage1,this.pageSize)
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
