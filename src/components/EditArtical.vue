<!--1、先获取指定ID的数据，并渲染到编辑页面-->
<!--2、根据ID修改数据，并同步保存到数据库中-->

<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
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
          // this.$http.put()里面的参数跟后端接口文件 app.js 里面的数据库操作函数的参数是一致的，
          // 其中里面的put() 表示 app.js 中的提交方式
          this.$http.put(`/articles/${this.$route.params.id}`,this.article).then(res =>{
            console.log(res.data);
            this.$message({
              message: '文章修改成功',
              type: 'success'
            });
            this.$router.push('/articles/index');  // 实现页面跳转
          })
        },
        fetch(){
          // 获取指定ID数据，并渲染到网页
          this.$http.get(`articles/${this.$route.params.id}`).then(res =>{
            this.article = res.data; // data表示真正的数据，上面template模块里面的:data
          })
        }
      },

      // 进入该网页便直接渲染数据
      created(){
        this.fetch();
      }
    }
</script>

<style scoped>

</style>
