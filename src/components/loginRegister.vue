<template>
  <div class="login-register">
    <div class="contain">

      <div class="big-box" :class="{active:isLogin}">

        <!--用户登录-->
        <div class="big-contain" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="email" placeholder="邮箱" v-model="form.useremail">
            <span class="errTips" v-if="emailError">* 邮箱填写错误 *</span>
            <input type="password" placeholder="密码" v-model="form.userpwd">
            <span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
        </div>

        <!--用户注册-->
        <div class="big-contain" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <input type="text" placeholder="用户名" v-model="form.username">

            <!--判断用户是否存在，并是否显示这串文字-->
            <span class="errTips" v-if="existed">* 该用户已经存在！ *</span>

            <input type="email" placeholder="邮箱" v-model="form.useremail">
            <input type="password" placeholder="密码" v-model="form.userpwd">
          </div>
          <button class="bbutton" @click="register">注册</button>
        </div>
      </div>

      <!--切换登录注册界面-->
      <div class="small-box" :class="{active:isLogin}">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起旅行</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'login-register',
    data(){
      return {
        isLogin:false,
        emailError: false,
        passwordError: false,
        existed: false,
        form:{
          username:'',
          useremail:'',
          userpwd:''
        }
      }
    },
    methods:{
      changeType() {
        this.isLogin = !this.isLogin;
        this.form.username = '';
        this.form.useremail = '';
        this.form.userpwd = ''
      },

      // 登录
      login() {
        if (this.form.useremail !== "" && this.form.userpwd !== "") {
          this.$http.post('/login',{email:this.form.useremail,password:this.form.userpwd} // 传给后端多个数据的写法！！！！！！！！！！！！！！！

          // {
          //   data: {
          //     email: this.form.useremail, // 对前端的useremail和userpwd重新命名，使得后端接受的数据名为email和password
          //       password: this.form.userpwd
          // }

          )
            .then( res => {
              switch(res.data){
                case 0:
                  alert("登陆成功！");

                  this.$router.push('/articles/index');  // 实现路由跳转，该URL地址为router/index.js里面设置的路由信息

                  //  sessionStorage 是HTML5新增的一个会话存储对象，
                  // 用于临时保存同一窗口(或标签页)的数据（key/value），
                  // 在关闭窗口或标签页之后将会删除这些数据
                  sessionStorage.setItem('ms_useremail',this.form.useremail);
                  sessionStorage.setItem('ms_user',JSON.stringify(this.form));

                  // console.log(JSON.stringify(self.form))
                  break;
                case -1:
                  this.emailError = true;
                  break;
                case 1:
                  this.passwordError = true;
                  break;
              }
            })
            .catch( err => {
              console.log(err);
            })
        } else{
          alert("填写不能为空！");
        }
      },

      // 注册
      register(){
        if(this.form.username !== "" && this.form.useremail !== "" && this.form.userpwd !== ""){
          this.$http.post('/register', this.form)
            .then(res => {
            console.log(res.data);
            switch(res.data){
              case 0:
                alert("注册成功！");
                this.login(); // 注册成功后跳转至登录页面
                break;
              case -1:
                this.existed = true;
                break;
            }
          })
            .catch( err => {
              console.log(err);
            });
        }else {
          alert("填写不能为空！");
        }


        // const self = this;
        // if(self.form.username !== "" && self.form.useremail !== "" && self.form.userpwd !== ""){
        //   self.$axios({
        //     method:'post',
        //     url: 'http://127.0.0.1:10520/api/user/add',
        //     data: {
        //       username: self.form.username,
        //       email: self.form.useremail,
        //       password: self.form.userpwd
        //     }
        //   })
        //     .then( res => {
        //       switch(res.data){
        //         case 0:
        //           alert("注册成功！");
        //           this.login();
        //           break;
        //         case -1:
        //           this.existed = true;
        //           break;
        //       }
        //     })
        //     .catch( err => {
        //       console.log(err);
        //     });
        //   // self.$router.push('')
        // } else {
        //   alert("填写不能为空！");
        // }
      }
    }
  }
</script>

<style scoped="scoped">
  .login-register{
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
  }
  .contain{
    width: 60%;
    height: 60%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 0 3px #f0f0f0,
    0 0 6px #f0f0f0;
  }
  .big-box{
    width: 70%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 30%;
    transform: translateX(0%);
    transition: all 1s;
  }
  .big-contain{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btitle{
    font-size: 1.5em;
    font-weight: bold;
    /*color: rgb(57,167,176);*/
    color: #B3C0D1;
  }
  .bform{
    width: 100%;
    height: 40%;
    padding: 2em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .bform .errTips{
    display: block;
    width: 50%;
    text-align: left;
    color: red;
    font-size: 0.7em;
    margin-left: 1em;
  }
  .bform input{
    width: 50%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 10px;
    padding-left: 2em;
    background-color: #f0f0f0;
  }
  .bbutton{
    width: 20%;
    height: 40px;
    border-radius: 24px;
    border: none;
    outline: none;
    background-color: #B3C0D1;
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
  }
  .small-box{
    width: 30%;
    height: 100%;
    /*background: linear-gradient(135deg,#31c27c,rgb(56,183,145));*/
    background-color: #B3C0D1;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(0%);
    transition: all 1s;
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  .small-contain{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .stitle{
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
  }
  .scontent{
    font-size: 0.8em;
    color: #fff;
    text-align: center;
    padding: 2em 4em;
    line-height: 1.7em;
  }
  .sbutton{
    width: 60%;
    height: 40px;
    border-radius: 24px;
    border: 1px solid #fff;
    outline: none;
    background-color: transparent;
    color: #fff;
    font-size: 0.9em;
    cursor: pointer;
  }

  .big-box.active{
    left: 0;
    transition: all 0.5s;
  }
  .small-box.active{
    left: 100%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    transform: translateX(-100%);
    transition: all 1s;
  }
</style>
