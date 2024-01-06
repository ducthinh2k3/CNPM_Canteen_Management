exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect('http://127.0.0.1:5500/FrontEnd/Auth/Login.html');
    }
}
exports.isAuth = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user;
        var user = req.session.user;
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
        next();
    }
}