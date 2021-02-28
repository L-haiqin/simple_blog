var express = require('express');
var app = express();

const jwt = require('jsonwebtoken');
const SECRET = 'ewgfvwergvwsgw5454gsrgvsvsd';

// 安装：npm install cors
// 使用：
// const cors = require('cors');
// app.use(cors());  #  不加上这句代码跨域访问时会出现错误，加上就不会出现跨域错误情况
app.use(require('cors')()); // 允许跨域

// 解析json文件数据，与使用body-parser中间件有什么区别？？？？？？？？？？？？？？？？？？？？？？？
app.use(express.json());

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fullstack',{
  useNewUrlParser:true,
  useFindAndModify:true,
  useCreateIndex:true
});

// 用户数据库
var User = mongoose.model('User',new mongoose.Schema({
  username:{
    type:String
  },
  email:{
    type:String,
    unique:true // 字段唯一
  },
  password:{
    type:String,
    set(val){
      // 通过bcryptjs对密码加密返回值: 第一个值为返回值， 第二个为密码强度
      return require('bcryptjs').hashSync(val,10);
    }
  }
}));

// 文章数据库
var Article = mongoose.model('Article',new mongoose.Schema({
  title:{type:String},
  body:{type:String}
}));

// app.get('/',async (req,res) =>{
//   res.send('index')
// });

// ****************************************** 用户登录注册 ******************************************

// 参考博客：https://www.cnblogs.com/zhoulifeng/p/11804366.html

// 注册，类似数据库的“增”
app.post('/api/register',async(req,res) =>{
  console.log(req.body); // 此处req.body接受到的数据及其参数来自前端，因此和前端数据的命名是一致的
  const mon_user = await User.findOne({
    email:req.body.useremail
  });

  if(mon_user) {
    res.send("-1"); // -1，表示用户已存在
  }else {
    const user = await User.create({
      username:req.body.username,
      email:req.body.useremail,
      password:req.body.userpwd
    });
    res.send("0"); // 0，表示用户注册成功
    console.log(user)
  }
});

// 登录，第一步判断用户是否存在，第二步判断密码是否正确，第三步生成token，返回客户端
app.post('/api/login',async(req,res) =>{
  console.log(req.body);
  const user = await User.findOne({
    email:req.body.email
  });
  if(!user) {
    // return res.status(422).send({
    //   message:"用户不存在"
    // })
    res.send("-1"); // -1，表示用户不存在
  }

  const isPasswordValid = require('bcryptjs').compareSync(
    req.body.password,
    user.password
  );
  if(!isPasswordValid){
    // return res.status(422).send({
    //   message:"密码无效"
    // })
    res.send("1"); // 1，表示密码无效
  }

  // const token = jwt.sign({
  //   id:String(user._id)
  // },SECRET);

  // 生成token
  // res.send({
  //   user,
  //   token
  // })

  // 直接返回登录成功，没有使用上面的token
  res.send("0"); // 0，表示登陆成功
});

// ****************************************** 文章增删查改 ******************************************

// 新增文章
app.post('/api/articles',async (req,res) =>{
  var article = await Article.create(req.body);
  res.send(article)
});

// 显示文章列表
app.get('/api/articles',async (req,res) =>{
  var article = await Article.find();
  res.send(article);
});

// 删除文章
app.delete('/api/articles/:id',async (req,res) =>{
  await Article.findByIdAndDelete(req.params.id);
  res.send({
    status:true
  })
});

// 指定ID获取数据
app.get('/api/articles/:id',async (req,res) =>{
  var article = await Article.findById(req.params.id);
  res.send(article);
});

// 修改文章（put，post，patch）并覆盖性保存
app.put('/api/articles/:id',async (req,res) =>{
  var article = await Article.findByIdAndUpdate(req.params.id,req.body);
  res.send(article);
});

app.listen(3001,() => {
  console.log('已启动服务http://localhost:3001/')
});
