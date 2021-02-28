<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

      <!--此处必须要写上router，后面的唯一标识index才有效！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！-->
      <el-menu router :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-tickets"></i>博客管理</template>

          <!--index属性是什么意思？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？-->
          <!--使用 vue-router 模式，则会在激活导航时以 index 作为 path 进行路由跳转-->
          <el-menu-item index="/articles/index">我的博客</el-menu-item>
          <el-menu-item index="/articles/create">写文章</el-menu-item>

        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown trigger="click" @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userCenter">我的博客</el-dropdown-item>
            <el-dropdown-item command="loginout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--<span :data="user">{{user.username}}</span>-->

        <!--头部显示用户的email-->
        <span>{{useremail}}</span>
      </el-header>

      <el-main>
        <el-table :data="articles">
          <el-table-column prop="title" label="标题" width="220">
          </el-table-column>
          <el-table-column prop="body" label="内容" width="700">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <!--scope表示当前这一行的数据-->
            <template slot-scope="scope">
              <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
              <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  // import UserCenter from "@/components/userCenter";
    export default {
      name: "ListArtical",
      // components: {UserCenter},
      data() {
        return {
          articles:[],
          email: 'linxin@163.com'
        }
      },

      computed:{
        useremail(){
          let useremail = sessionStorage.getItem('ms_useremail');
          return useremail ? useremail : this.email;
        }
      },

      methods:{
        handleCommand(command) {
          if(command === 'loginout'){
            sessionStorage.removeItem('ms_useremail');
            sessionStorage.removeItem('ms_userId');
            this.$router.push('/');
          } else if (command === 'userCenter') { // 直接进入我的博客列表，不再使用 个人中心 路由
            this.$router.push('/articles/index');
          }
        },

        fetch(){
          // 获取数据
          this.$http.get('articles').then(res =>{
            this.articles = res.data; // data表示真正的数据，上面template模块里面的:data
          })
        },

        edit(id){
          // 实现页面跳转
          this.$router.push(`/articles/${id}/edit`); // 此处为反引号（es6的模板字符串），跳转到对应ID的编辑页面
        },

        remove(id){
          this.$http.delete(`articles/${id}`).then(res =>{
            this.$message({
              message: '文章删除成功',
              type: 'success'
            });
            this.fetch(); // 刷新数据
          })
        }
      },

      // created()生命周期钩子函数，一般用于调用ajax获取页面初始化所需的数据
      created(){
        this.fetch();
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>


