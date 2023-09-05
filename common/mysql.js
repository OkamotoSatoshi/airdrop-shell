import { rejects } from "assert"
import mysql from "mysql"


const pool = mysql.createPool({
    connectionLimit:10 ,
    host:"127.0.0.1",
    database:"airdrop-shell",
    user:"airdrop-shell",
    password:"airdrop-shell"
})


export default function exeSQL(sql){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err) return reject(err)
            connection.query(sql,(err,result)=>{
                if(err)  console.log(err,"数据库语法错误")
                connection.release() ; //释放连接
                resolve(result) ; //执行数据的结果返回
            })
        })
    })
}
