/* const mydb = require('../ultis/mydb');
const tableName = 'user'

const getUsernameAndPassword = async (req,res)=>{
    const Username = req.body.username;
    const Password = req.body.password;
    console.log("Data: ",req.body);
    let [result,fields] = await mydb.pool.query( `select * from ${tableName} where Username=? and
     Password = ?`[Username,Password]);
     console.log(result);
}
module.exports = 
{
    getUsernameAndPassword,
} */

const sql = require('../ultis/mydb').pool;
const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.VaiTro = user.role;
}
User.create = (newUser, result) => {
    sql.query("INSERT INTO  user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Create User: ", { id: res.InsertId, ...newUser });
        result(null, { id: res.InsertId, ...newUser });
    });
};
User.FindByUsername = (username, result) => {
    sql.query(`SELECT * from user WHERE Username='${username}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result(null, null);
    })
}
module.exports = User;
