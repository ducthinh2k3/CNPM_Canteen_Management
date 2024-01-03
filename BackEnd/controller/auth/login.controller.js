/* const User = require('../models/auth.model');
const mydb = require('../ultis/mydb');

const tableName = 'user'
const getUsernameAndPassword = async (req, res, next) => {
    try {
        const Username = req.body.username;
        const Password = req.body.password;

        let [result, fields] = await mydb.pool.query(`select * from ${tableName} where Username=? and
         Password = ?`, [Username, Password]);
        console.log("result: ", result[0].VaiTro);
        if (result == "") {

        }
        else {
            if (result[0].VaiTro === 1) {
                res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/DashBoard.html')
            }
            else if (result[0].VaiTro === 2) {
                res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/overview.html')
            }
            else if (result[0].VaiTro === 3) {
                res.redirect('http://127.0.0.1:5500/FrontEnd/Kitchen.html')
            }
            else {
                res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/Login.html')
            }
        }
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getUsernameAndPassword
} */
const User = require('../../models/auth.model');
const bcrypt = require('bcrypt');
require('dotenv/config');

exports.login = (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        User.FindByUsername(username, (err, user) => {
            if (!user) {
                const errorMessage = 'Username or password is incorrest!';
                res.send(`
                <script>
                    alert("${errorMessage}");
                    window.location.href = "http://127.0.0.1:5500/FrontEnd/Auth/Login.html"; // Chuyển hướng đến trang chính hoặc trang khác
                </script>
            `);
                //res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Login.html');
            } else {
                bcrypt.compare(password, user.Password, (err, result) => {
                    if (result == true) {
                        //req.session.loggedin = true;
                        //req.session.user = user;
                        if (user.VaiTro === 1) {
                            res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/DashBoard.html');
                        }
                        else if (user.VaiTro === 2 || user.VaiTro === null) {
                            res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/overview.html');
                        }
                        else {
                            res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/Kitchen.html');
                        }
                    } else {
                        res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Login.html')
                    }
                })
            }
        })


    } else {
        res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Login.html');
    }
}
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Login.html');
    })
}