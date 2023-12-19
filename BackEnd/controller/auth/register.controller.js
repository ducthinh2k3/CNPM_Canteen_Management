const User = require('../../models/auth.model');
const bcrypt = require('bcrypt');
require('dotenv/config');

exports.register = (req, res) => {
    const { username, password, role } = req.body;
    if (username && password) {
        User.FindByUsername(username, (err, user) => {
            if (err || user) {
                const conflictError = 'Username are exist.;'
                res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Register.html', conflictError);
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
        res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Register.html');
    }
}