const User = require('../models/user.model');

const getUserPage = async (req, res, next) => {
    try{
        const result = await User.getAll();
        res.json(result)
    } catch (error) {
        next(error);
    }
}

const addUser = async (req, res, next) => {
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

const updateUser = async (req, res, next) => {
    try{
        const entity = {
            UserID: req.body.editEmployeeCode,
            HoTen: req.body.editEmployeeName,
            Username: req.body.editEmployeeUser,
            Password: req.body.editEmployeePassword,
            VaiTro: req.body.editEmployeeRole
        }
        const rs = await User.updateRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/staff.html')
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const userID = req.query.id;
        const result = await User.deleteRowByID(userID);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/staff.html')
    } catch (error) {
        next(error);
    }
} 

const getByID = async (req, res, next) => {
    try{
        const userID = req.query.id;
        const result = await User.getByID(userID);
        if(result.length == 0){
            res.send('Invalid')
        }
        const user = result[0];
        res.json(user)
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUserPage,
    addUser,
    updateUser,
    getByID,
    deleteUser
}