const Material = require('../models/material.model');
const Product = require('../models/product.model');

// const getMaterialPage = async (req, res, next) => {
//     try{
//         const receiptID = req.query.id;
//         const result = await Material.getAllExceptExits(receiptID);
//         res.json(result)
//     } catch (error) {
//         next(error);
//     }
// }
const getMaterialPage = async (req, res, next) => {
    try {
        let receiptID = req.query.id;
        const match = receiptID.match(/^(\d+)/);

        if (match) {
            receiptID = parseInt(match[1]);
        } else {
            throw new Error('Invalid receiptID format');
        }
        const page = parseInt(req.query.page, 10) || 1;
        const pageSize = parseInt(req.query.pageSize, 10) || 4; // Số dòng trên 1 trang
        console.log('id:', receiptID); 
        console.log('page:', page);
        console.log('pageSize:', pageSize);

        const result = await Material.getAllExceptExits(receiptID, page, pageSize);
        console.log('data:', result);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const searchByNameAndPaging = async (req, res, next) => {
    try {
      let receiptID = req.query.id;
      const match = receiptID.match(/^(\d+)/);
  
      if (match) {
        receiptID = parseInt(match[1]);
      } else {
        throw new Error('Invalid receiptID format');
      }
  
      const name = req.query.name || ''; 
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 4;
  
      const result = await Material.searchByNameAndPaging(receiptID, name, page, pageSize);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };


const getMaterialSearchPage = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 4;
        const searchValue = req.query.search || '';

        const result = await Material.searchByNameAndPage(page, pageSize, searchValue);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const addMaterial = async (req, res, next) => {
    try {
        const MaPhieu = req.body.receiptCode
        const entity = {
            HinhAnh: req?.file?.filename || "default.png",
            TenNguyenLieu: req.body.materialName,
            SLTon: 0,
            DonVi: req.body.materialUnit,
            DonGia: parseInt(req.body.materialUnitValue),
            TrangThaiBan: req.body.materialStatus,
        }

        if (req.body.materialStatus == 1) {
            const product = {
                TenSP: entity.TenNguyenLieu,
                DanhMuc: 1,
                HinhAnh: entity.HinhAnh,
                SLTon: 0,
                GiaBan: entity.DonGia,
                DanhGia: 0,
                TrangThai: 1
            }
            const result = await Product.addRow(product);
            entity.MaSP = result.insertId
        }

        const rs = await Material.addRow(entity);
        res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/material.html?id=${MaPhieu}`)
    } catch (error) {
        next(error);
    }
}

const updateMaterial = async (req, res, next) => {
    try {
        const MaPhieu = req.body.editReceiptCode
        const entity = {
            MaNguyenLieu: req.body.editMaterialCode,
            TenNguyenLieu: req.body.editMaterialName,
            DonVi: req.body.editMaterialUnit,
            DonGia: req.body.editMaterialUnitPrice,
            TrangThaiBan: req.body.editMaterialStatus,
        }
        if (req.file) {
            entity.HinhAnh = req.file.filename
        }
        const rs = await Material.updateRow(entity);
        res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/material.html?id=${MaPhieu}`)
    } catch (error) {
        next(error);
    }
}

const updateQuantityMaterialByProID = async (req, res, next) => {
    try {
        const entity = {
            MaSP: req.query.proID,
            SLTon: req.query.proQuantity
        }
        const rs = await Material.updateRowByProID(entity);
        res.json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.json({ success: false, message: "Product not found or could not be deleted." });
        next(error);
    }
}

const deleteMaterial = async (req, res, next) => {
    try {
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
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 4; //số dòng trên 1 trang
        const result = await Material.getByPage(page, pageSize);
        res.json(result)
    } catch (error) {
        next(error);
    }
}

const updateInventory = async (req, res, next) => {
    try {
        const entity = {
            MaNguyenLieu: req.body.editMaterialCode,
            TenNguyenLieu: req.body.editMaterialName,
            SLTon: req.body.editReceiptQuantity,
            DonVi: req.body.editMaterialUnit,
            DonGia: req.body.editMaterialUnitPrice
        }
        const rs = await Material.updateRow(entity);
        res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/inventory.html`)
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
    updateQuantityMaterialByProID,
    getInventoryPage,
    getMaterialSearchPage,
    searchByNameAndPaging,
    updateInventory
}