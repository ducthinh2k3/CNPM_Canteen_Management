exports.loggedin = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user;
        next();
    } else {
        res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/Login.html');
    }
}
exports.isAuth = (req, res, next) => {
    if (req.session.loggedin) {
        res.locals.user = req.session.user;
        res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/DashBoard.html')
    }
    else {
        next();
    }
}