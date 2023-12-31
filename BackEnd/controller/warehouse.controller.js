const Warehouse = require('../models/warehouse.model')
const Trade = require('../models/trade.model');

// Warehouse
const getWarehousePage = async (req, res, next) => {
    try{
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 4; // số dòng trên 1 trang
        const result = await Warehouse.getByPage(page, pageSize);
        res.json({ success: true, result: result });
    } catch (error) {
        res.json({ success: false, message: "Warehouse-receipt not found or could not be deleted." });
        next(error);
    }
}

const addWarehouseReceipt = async (req, res, next) => {
    try{
        const entity = {
            NgayLap: req.body.NgayLap,
            TongTien: req.body.TongTien,
        }
        const rs = await Warehouse.addRow(entity);
        const rsTrade = await Trade.addRow({
            MaPhieu: rs.insertId,
            LoaiPhieu: 'ChiNhapKho',
            NgayLap: req.body.NgayLap,
            MoTa: 'Nhập Kho',
            TongTien: req.body.TongTien,
        })
        res.json({ success: true, id: rs.insertId });
    } catch (error) {
        next(error);
        res.json({ success: false, message: "Warehouse-receipt not found or could not be add." });
    }
}

const updateWarehouseReceipt = async (req, res, next) => {
    try{
        const entity = {
            MaPhieu: req.body.MaPhieu,
            TongTien: req.body.TongTien
        }
        const rs = await Warehouse.updateRow(entity);
        res.json({ success: true, message: "Successfull"  });
    } catch (error) {
        res.json({ success: false, message: "Fail" });
        next(error);
    }
}

const deleteWarehouseReceipt = async (req, res, next) => {
    try{
        const receiptID = req.query.receiptID;
        const result = await Warehouse.deleteRowByID(receiptID);
        res.json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.json({ success: false, message: "Product not found or could not be deleted." });
        next(error);
    }
} 

// Warehouse detail
// const getWarehouseDetailPage = async (req, res, next) => {
//     try{
//         const MaPhieu = req.params.id;
//         const result = await Warehouse.getAllDetailWithID(MaPhieu);
//         res.json({ success: true, result: result});
//     } catch (error) {
//         res.json({ success: false, message: "Warehouse-receipt-detail not found or could not be deleted." });
//         next(error);
//     }
// }
const getWarehouseDetailPage = async (req, res, next) => {
    try {
        const MaPhieu = req.params.id;
        const page = req.query.page || 1; 
        const pageSize = req.query.pageSize || 4; 

        const result = await Warehouse.getAllDetailWithID(MaPhieu, page, pageSize);
        res.json({ success: true, result: result });
    } catch (error) {
        res.json({ success: false, message: "Warehouse-receipt-detail not found or could not be deleted." });
        next(error);
    }
};


const addWarehouseReceiptDetail = async (req, res, next) => {
    try{
        const entity = req.body 
        for(let i=0; i<entity.length; i++){
            const rs = await Warehouse.addRowDetail(entity[i]);
        }
        res.json({ success: true, message: "Successful" });
    } catch (error) {
        next(error);
        res.json({ success: false, message: "Warehouse-receipt not found or could not be add." });
    }
}

const updateWarehouseReceiptDetail = async (req, res, next) => {
    try{
        const receiptId = req.body.editReceiptCode
        const entity = {
            MaPhieu: req.body.editReceiptCode,
            MaNguyenLieu: req.body.editMaterialCode,
            SoLuong: req.body.editReceiptQuantity,
        }
        const rs = await Warehouse.updateRowDetail(entity);
        res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/warehouse-receipt-detail.html?id=${receiptId}`)
    } catch (error) {
        next(error);
    }
}

const deleteWarehouseReceiptDetail = async (req, res, next) => {
    try{
        const receiptID = req.body.MaPhieu
        const materialID = req.body.MaNguyenLieu;
        const result = await Warehouse.deleteRowDetailBy2ID(receiptID,materialID);
        res.json({ success: true, message: "Product deleted successfully." });
    } catch (error) {
        res.json({ success: false, message: "Product not found or could not be deleted." });
        next(error);
    }
}

const deleteAllWHReceiptDetailByID = async (req, res, next) => {
    try{
        const receiptID = req.query.id
        const result = await Warehouse.deleteRowDetail(receiptID)
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
    getWarehousePage,
    addWarehouseReceipt,
    getWarehouseDetailPage,
    addWarehouseReceiptDetail,
    updateWarehouseReceiptDetail,
    deleteWarehouseReceiptDetail,
    updateWarehouseReceipt,
    deleteAllWHReceiptDetailByID,
    deleteWarehouseReceipt
}