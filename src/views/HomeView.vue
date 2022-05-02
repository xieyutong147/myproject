<template>
  <el-container style="height: 100%">
    <el-header style="padding: 0">
      <BaseHeader :activeIndex="activeIndex"></BaseHeader>
    </el-header>
    <MainView v-show="footerShow" class="me-container1"></MainView>
    <router-view v-show="!footerShow" class="me-container"/>
  </el-container>

</template>

<script>

import BaseHeader from "@/components/BaseHeader";
import BaseFooter from "@/components/BaseFooter";

import MainView from "@/views/MainView";
export default {
  name: 'HomeView',

  components: {
    BaseHeader,
    BaseFooter,

    MainView
  },
  data(){
    return{
      activeIndex: '/',
      footerShow:true
    }

  },
  beforeRouteEnter (to, from, next){
    next(vm => {
      vm.activeIndex = to.path
    })
  },
  beforeRouteUpdate (to, from, next) {
    if(to.path === '/'){
      this.footerShow = true
    }else{
      this.footerShow = false
    }
    this.activeIndex = to.path
    next()
  }

}
</script>

<style>
.me-container1{
  margin: 100px 50px 50px 0;
  height: 90%;
  width: 100%;

}
.me-container{
  margin: 100px auto auto 140px;
  height: 100%;

}


</style>
