<template>
  <el-card >
    <div slot="header" class="me-tag-header">
      <span>最热标签</span>
      <a @click="moreTags" class="me-pull-right me-tag-more" style="margin-left: 50px">查看全部</a>
    </div>

    <ul class="me-tag-list">
      <li class="me-tag-item" v-for="(t,index) in tags">
        <!--type="primary"-->
        <el-button @click="tag(t.id)" size="mini" type="primary" round plain>{{t.typeName}}</el-button>
      </li>
    </ul>
  </el-card>
</template>

<script>
import request from "@/utils/request";
import {state_code} from "../../../public/property";

export default {
  name: "CardTag",
  data() {
    return {
      tags:[]
    }
  },
  methods: {
    moreTags() {
      this.$router.push('/category')
    },
    tag(id) {
      this.$router.push({path: `/category/${id}`})
    },
    getTags(){
      request.get("/types/getTypes/5").then(res=>{
        if(res.code===state_code.HANDLE_SUCCESS){
          console.log(res.data)
          this.tags=res.data
        }else{
          throw error("出错了")
        }
      })
    }
  },
  created() {
    this.getTags()
  }
}
</script>

<style scoped>
.me-tag-header {
  font-weight: 600;
}

.me-tag-more {
  font-size: 14px;
  color: #78b6f7;
}

.me-tag-list {
  list-style-type: none;
}

.me-tag-item {
  display: inline-block;
  padding: 4px;
  font-size: 14px;
  color: #5FB878;
}

.me-tag-item a:hover {
  text-decoration: underline;
}
.el-card ::v-deep .el-card__header {

  background-color: palegoldenrod;
}
.el-card ::v-deep  {
  border-radius: 30px;
  background-color: powderblue;
}
</style>
