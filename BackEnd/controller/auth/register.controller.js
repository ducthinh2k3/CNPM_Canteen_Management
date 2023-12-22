const User = require('../../models/auth.model');
const bcrypt = require('bcrypt');
require('dotenv/config');

exports.register = (req, res) => {
    const { username, password, role } = req.body;
    if (username && password) {
        User.FindByUsername(username, (err, user) => {
            if (err || user) {
                const errorMessage = 'Username is exist!';
                res.send(`
                <script>
                    alert("${errorMessage}");
                    window.location.href = "http://127.0.0.1:5500/FrontEnd/Auth/Register.html"; // Chuyển hướng đến trang chính hoặc trang khác
                </script>
            `);
                // res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Register.html');
            }
        })
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) => {
            const user = new User({
                username: username,
                password: hashed,
                role: role,
            });
            User.create(user, (err, user) => {
                if (!err) {
                    res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Login.html')
                }
            })
        });

    } else {
        const errorMessage = 'Username and password is blank!';
        res.send(`
                <script>
                    alert("${errorMessage}");
                    window.location.href = "http://127.0.0.1:5500/FrontEnd/Auth/Register.html"; // Chuyển hướng đến trang chính hoặc trang khác
                </script>
            `);
    }
}