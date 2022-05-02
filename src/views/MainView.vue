<template>
  <div v-if="!flag">
    <div style="margin-left: 25%;margin-top: 10%">
      <h1 style="margin-left: 25%">请先登录</h1>
    </div>
  </div>
  <div v-else v-title :data-title="title">
    <el-container style="width: 100%;height:100%">
        <el-main style="width: 50%;height:100% ;" >
          <PostList style="margin-left: 40%;margin-top: 10px"></PostList>
        </el-main>
        <div style="float: left">
          <el-col>
            <CardTag style="width: 300px;height: 250px;margin-right: 20px"></CardTag>
          </el-col>
        </div>
    </el-container>

  </div>
</template>

<script>
import CardTag from "@/components/card/CardTag";
import request from "@/utils/request";
import {state_code} from "../../public/property";
import PostList from "@/components/article/PostList";
import store from "@/store";
export default {
  name: "MainView",
  components:{
    CardTag,
    PostList

  },
  data(){
    return{
      flag:store.getters.get_is_login,
      searchItem:'',
      flag1:false,
      fenlei:[],

    }

  },
  computed: {
    title (){
      return '主页'
    }
  },
  methods: {
    querySearch(){
      if(this.searchItem===''){
        request.get('/types/getTypes/-1').then(res=>{
          if(res.code===state_code.HANDLE_SUCCESS) {
            for (let k in res.data) {
              this.fenlei.push(k)
            }
            console.log(this.fenlei)
          }else{
            this.$message({type:"error",message:res.message})
          }

        })

      }else {
        let map={
          name:this.searchItem
        }
        request.post('/types/getTypesMOHU',map).then(res=>{
          if(res.code===state_code.HANDLE_SUCCESS){
            for (let k in res.data) {
              this.fenlei.push(k)
            }
            console.log(this.fenlei)
          }else{
            this.$message({type:"error",message:res.message})
          }

        })
      }

    }

  },

}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
body{
  display: flex;
}
</style>
