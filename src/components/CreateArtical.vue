<template>
  <!--增加内容@submit.native.prevent-->
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
      name: "CreateArtical",
      data() {
        return {
          // 双向绑定，article命名，v-model表示
          article: {
            title: '',
            body: ''
          }
        }
      },
      methods: {
        saveArticle() {
          this.$http.post('/articles',this.article).then(res =>{
            console.log(res.data);
            this.$message({
              message: '文章创建成功',
              type: 'success'
            });
            this.$router.push('/articles/index');  // 实现页面跳转
          })
        }
      }
    }
</script>

<style scoped>

</style>
