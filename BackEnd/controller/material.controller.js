const Material = require('../models/material.model');

const getMaterialPage = async (req, res, next) => {
    try{
        const receiptID = req.query.id;
        const result = await Material.getAllExceptExits(receiptID);
        res.json(result)
    } catch (error) {
        next(error);
    }
}

const addMaterial = async (req, res, next) => {
    try{
        const MaPhieu = req.body.receiptCode
        const entity = {
            TenNguyenLieu: req.body.materialName,
            SLTon: 0,
            DonVi: req.body.materialUnit,
            DonGia: parseInt(req.body.materialUnitValue),
        }
        const rs = await Material.addRow(entity);
        res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/material.html?id=${MaPhieu}`)
    } catch (error) {
        next(error);
    }
}

const updateMaterial = async (req, res, next) => {
    try{
        const MaPhieu = req.body.editReceiptCode
        const entity = {
            MaNguyenLieu: req.body.editMaterialCode,
            TenNguyenLieu: req.body.editMaterialName,
            DonVi: req.body.editMaterialUnit,
            DonGia: req.body.editMaterialUnitPrice
        }
        const rs = await Material.updateRow(entity);
        res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/material.html?id=${MaPhieu}`)
    } catch (error) {
        next(error);
    }
}

const updateQuantityMaterial = async (req, res, next) => {
    try{
        const entity = req.body
        // for(let i=0; i<entity.length; i++){
        //     const rs = await Material.updateRow(entity[i]);
        // }
        // res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/material.html?id=${MaPhieu}`)
        res.json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.json({ success: false, message: "Product not found or could not be deleted." });
        next(error);
    }
}

const deleteMaterial = async (req, res, next) => {
    try{
        const materialID = req.query.id;
        const result = await Material.deleteRowByID(materialID);
        res.json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.json({ success: false, message: "Product not found or could not be deleted." });
        next(error);
    }
}

// Inventory
const getInventoryPage = async (req, res, next) => {
    try{
        const result = await Material.getAll();
        res.json(result)
    } catch (error) {
        next(error);
    }
}

const updateInventory = async (req, res, next) => {
    try{
        const entity = {
            MaNguyenLieu: req.body.editMaterialCode,
            TenNguyenLieu: req.body.editMaterialName,
            DonVi: req.body.editMaterialUnit,
            DonGia: req.body.editMaterialUnitPrice
        }
        const rs = await Material.updateRow(entity);
        res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/material.html?id=${MaPhieu}`)
    } catch (error) {
        next(error);
    }
}

// const getByID = async (req, res, next) => {
//     try{
//         const userID = req.query.id;
//         const result = await User.getByID(userID);
//         if(result.length == 0){
//             res.send('Invalid')
//         }
//         const user = result[0];
//         res.json(user)
//     } catch (error) {
//         next(error);
//     }
// }

module.exports = {
    getMaterialPage,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    updateQuantityMaterial,
    getInventoryPage
}