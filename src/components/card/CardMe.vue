<template>
<!--  <el-card>-->
<!--    <h1 class="me-author-name">-->
<!--      <el-avatar :src="current_userInfo.avatar"></el-avatar>-->
<!--      {{ current_userInfo.nickname }}</h1>-->
<!--    <div class="me-author-description">-->
<!--      <el-col>&nbsp{{ current_userInfo.email }}</el-col>-->
<!--      <el-col>{{ current_userInfo.having_createdTime}}</el-col>-->
<!--    </div>-->
<!--&lt;!&ndash;    <div class="me-author-tool">&ndash;&gt;-->
<!--&lt;!&ndash;      <i @click="showTool(current_userInfo)" :title="qq.title" class="me-icon-QQ"></i>&ndash;&gt;-->
<!--&lt;!&ndash;      <i @click="showTool(current_userInfo)" :title="github.title" class="me-icon-github"></i>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--  </el-card>-->
</template>

<script>



export default {
  name: 'CardMe',
  data() {
    return {
      current_userInfo: {
        nickname: this.$store.state.nickname,
        avatar: this.$store.state.avatar,
        email: this.$store.state.email
      }
    }

  },
  methods: {
    showTool(tool) {
      this.$message({
        duration: 0,
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: '<strong>' + tool.message + '</strong>'
      });
    }
  }
}
</script>

<style scoped>
.me-author-name {
  text-align: center;
  font-size: 30px;
  border-bottom: 1px solid #5FB878;
}

.me-author-description {
  padding: 8px 0;
}

.me-icon-job {
  padding-left: 16px;
}

.me-author-tool {
  text-align: center;
  padding-top: 10px;
}

.me-author-tool i {
  cursor: pointer;
  padding: 4px 10px;
  font-size: 30px;
}
</style>
