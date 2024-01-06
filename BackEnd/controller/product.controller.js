const Product = require('../models/product.model');
const Material = require('../models/material.model');

const getProductPage = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 2; // số dòng trên 1 trang

        console.log(page);

        const result = await Product.getProductsByPage(page, pageSize);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const searchProductsByNameAndPage = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 2; // số dòng trên 1 trang
        const searchValue = req.query.name;

        const result = await Product.searchProductsByNameAndPage(page, pageSize, searchValue);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const addProduct = async (req, res, next) => {
    try {
        const entity = {
            TenSP: req.body.itemName,
            DanhMuc: 2,
            HinhAnh: req.file.filename,
            SLTon: 1,
            GiaBan: parseInt(req.body.itemCost),
            DanhGia: 0,
            TrangThai: 1
        }
        const rs = await Product.addRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/items.html')
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const entity = {
            MaSP: req.body.editItemCode,
            TenSP: req.body.editItemName,
            // DanhMuc: req.body.editItemCategory,
            GiaBan: parseInt(req.body.editItemCost),
        }
        if (req.file) {
            entity.HinhAnh = req.file.filename
        }
        if (req.body.editItemCategory == 2) {
            entity.SLTon = req.body.editItemQuantity
        } else {
            const material = {
                MaSP: entity.MaSP,
                SLTon: req.body.editItemQuantity
            }
            await Material.updateRowByProID(material);
        }
        const rs = await Product.updateRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/items.html')
    } catch (error) {
        next(error);
    }
}

const updateQuantityProduct = async (req, res, next) => {
    try {
        const entity = {
            MaSP: req.body.editItemCode,
            TenSP: req.body.editItemName,
            // DanhMuc: req.body.editItemCategory,
            GiaBan: parseInt(req.body.editItemCost),
        }
        if (req.file) {
            entity.HinhAnh = req.file.filename
        }
        if (req.body.editItemCategory == 2) {
            entity.SLTon = req.body.editItemQuantity
        } else {
            const material = {
                MaSP: entity.MaSP,
                SLTon: req.body.editItemQuantity
            }
            await Material.updateRowByProID(material);
        }
        const rs = await Product.updateRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/items.html')
    } catch (error) {
        next(error);
    }
}

const updateProductStatus = async (req, res, next) => {
    try {
        const entity = {
            MaSP: req.query.productID,
            TrangThai: req.query.status
        }
        const rs = await Product.updateRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/items.html')
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const productID = req.query.id;
        const result = await Product.deleteRowByID(productID);
        res.json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.json({ success: false, message: "Product not found or could not be deleted." });
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
    addProduct,
    getProductPage,
    updateProduct,
    deleteProduct,
    searchProductsByNameAndPage,
    updateProductStatus,
    updateQuantityProduct
}
