<template>
  <el-card>
    <h1 class="me-author-name">{{ current_userInfo.nickname }}</h1>
    <div class="me-author-description">
      <span><i class="me-icon-job"></i> &nbsp;{{ current_userInfo.email }}</span>
    </div>
<!--    <div class="me-author-tool">-->
<!--      <i @click="showTool(current_userInfo)" :title="qq.title" class="me-icon-QQ"></i>-->
<!--      <i @click="showTool(current_userInfo)" :title="github.title" class="me-icon-github"></i>-->
<!--    </div>-->
  </el-card>
</template>

<script>


export default {
  name: 'CardMe',
  data() {
    return {
      current_userInfo: {
        nickname: this.$store.state.nickname,
        avatar: this.$store.state.avatar,
        having_createdTime: this.$store.state.create_time - Date.now(),
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
