const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const {onSelectOnlyUser,onSelectAddUser} = require('./db/editUserListdb')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200); /让options请求快速返回/
  }
  else {
    next();
  }
})

app.post('/login', function (req, res) {
  console.log('--------------- 提交的表单数据 ---------------');
  console.log(req.body, '\n\n')
  const { username, password } = req.body

  onSelectOnlyUser({ username, password }).then((result) => {
    console.log('--------------- select result ---------------')
    console.log(result)
    if (result.length) {
      res.send(JSON.stringify({ isLogin: true, msg: 'Welcome 登录成功!' }))
    } else {
      res.send(JSON.stringify({ isLogin: false, msg: '账号或密码错误!' }))
    }
  },()=>{console.log(result)}).catch(err => {
    console.log(err)
  })
})

app.post('/register', function (req, res) {
  console.log('--------------- 提交的表单数据 ---------------');
  console.log(req.body, '\n\n')
  const { username, password } = req.body

  onSelectAddUser({ username, password }).then((result) => {
    console.log('--------------- select result ---------------')
    console.log(result)
    res.send(JSON.stringify({isSuccess: true, msg: '注册成功!' }))
  },
  //reject处理函数
  (rejectMsg)=>{
    console.log(rejectMsg)
    res.send(rejectMsg)
  })
  .catch(err => {
    console.log(err)
  })
})

app.listen(5000, () => {
  console.log('localhost:5000 is running!')
})