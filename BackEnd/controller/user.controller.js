const User = require('../models/user.model');

const getProductPage = async (req, res, next) => {
    try{
        const result = await User.getAll();
        res.json(result)
    } catch (error) {
        next(error);
    }
}

const addProduct = async (req, res, next) => {
    try{
        const entity = {
            HoTen: req.body.employeeName,
            Username: req.body.employeeUser,
            Password: req.body.employeePassword,
            VaiTro: req.body.employeeRole
        }
        const rs = await User.addRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/staff.html')
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProductPage,
    addProduct
}