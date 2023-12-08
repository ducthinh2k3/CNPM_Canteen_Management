const Material = require('../models/material.model');

const getMaterialPage = async (req, res, next) => {
    try{
        const result = await Material.getAll();
        res.json(result)
    } catch (error) {
        next(error);
    }
}

const addMaterial = async (req, res, next) => {
    try{
        const entity = {
            TenNguyenLieu: req.body.materialName,
            SLTon: 0,
            DonVi: req.body.materialUnit,
            DonGia: parseInt(req.body.materialUnitValue),
        }
        const rs = await Material.addRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/inventory.html')
    } catch (error) {
        next(error);
    }
}

// const updateProduct = async (req, res, next) => {
//     try{
//         const entity = {
//             MaSP: req.body.editItemCode,
//             TenSP: req.body.editItemName,
//             DanhMuc: req.body.editItemCategory,
//             GiaBan: parseInt(req.body.editItemCost),
//         }
//         if(req.file){
//             entity.HinhAnh = req.file.filename
//         }
//         const rs = await Product.updateRow(entity);
//         res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/items.html')
//     } catch (error) {
//         next(error);
//     }
// }

// const deleteProduct = async (req, res, next) => {
//     try{
//         const productID = req.query.id;
//         const result = await Product.deleteRowByID(productID);
//         res.json({ success: true, message: "Product deleted successfully." });
//     } catch (error) {
//         res.json({ success: false, message: "Product not found or could not be deleted." });
//         next(error);
//     }
// } 

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
    addMaterial
}