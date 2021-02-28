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
      <p>开启我的博客</p>
    </el-container>
  </el-container>
</template>

<script>
    export default {
      name: "userCenter",
      data() {
        return {
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
          } else if (command === 'userCenter') {
            this.$router.push('/user');
          }
        }
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
