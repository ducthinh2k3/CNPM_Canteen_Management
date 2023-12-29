const User = require('../models/user.model');

const getUserPage = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 4; //số dòng trên 1 trang

        const result = await User.getUsersByPage(page, pageSize);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

const searchUsersByName = async (req, res, next) => {
    try {
        const name = req.query.name;
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 4; // Số lượng mục trên mỗi trang


        if (!name) {
            return res.status(400).json({ success: false, message: 'Missing required parameter: name' });
        }

        const searchResult = await User.searchByNameWithPagination(name, page, pageSize);
        res.json({ success: true, result: searchResult });
    } catch (error) {
        console.error('Error in searchUsersByName:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

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
    searchUsersByName,
    getUserPage,
    addUser,
    updateUser,
    getByID,
    deleteUser
}