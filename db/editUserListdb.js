const mysqlConnection = require('./mysqlConnect')

const  onSelectOnlyUser = function(params){
  return new Promise(function(resolve, reject){
    let  selectSql = 'SELECT * FROM userInfo WHERE username = ? AND password = ?;'
    let  selectSqlParams = [params.username, params.password]
    //查询
    mysqlConnection.query(selectSql,selectSqlParams,function (err, result) {
      if(err){
        console.log('[SQL ERROR] - ',err.message)
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

const onSelectAddUser=function(params){
  const {username, password}=params
  return new Promise(function(resolve, reject){
    let  selectSql1 = "SELECT * FROM userInfo WHERE username = ?;"
    mysqlConnection.query(selectSql1, [username],function (err, result) {
      if(err){
        console.log('[SQL ERROR1] - ',err.message)
        reject(err)
        return
      }
      if(result.length){
        reject({isSuccess: false,msg:'用户名已存在!'})
      }else{
        //插入数据
        let  selectSql2 = "INSERT INTO userInfo SET ?;"
        let  selectSqlParams = [{username, password}]
        //查询
        mysqlConnection.query(selectSql2,selectSqlParams,function (err, result) {
          if(err){
            console.log('[SQL ERROR2] - ',err.message)
            reject(err)
            return
          }
          resolve(result)
        })
      }
    })
  })
}

module.exports = {
  onSelectOnlyUser,
  onSelectAddUser
}