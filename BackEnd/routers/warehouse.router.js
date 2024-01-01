const {
    getWarehousePage,
    getWarehouseDetailPage,
    addWarehouseReceipt,
    addWarehouseReceiptDetail,
    updateWarehouseReceiptDetail,
    updateWarehouseReceipt,
    deleteWarehouseReceiptDetail,
    deleteAllWHReceiptDetailByID,
    deleteWarehouseReceipt
} = require('../controller/warehouse.controller');

const express = require('express');
const router = express.Router();

// Warehouse detail
router.get('/warehouse-receipt-detail/:id', getWarehouseDetailPage);
router.post('/warehouse-receipt-detail/add', addWarehouseReceiptDetail);
router.post('/warehouse-receipt-detail/update', updateWarehouseReceiptDetail);
router.post('/warehouse-receipt-detail/delete', deleteWarehouseReceiptDetail);
router.post('/warehouse-receipt-detail/delete-all', deleteAllWHReceiptDetailByID);

// Warehouse
router.get('/warehouse-receipt', getWarehousePage);
router.post('/warehouse-receipt/add', addWarehouseReceipt);
router.post('/warehouse-receipt/update', updateWarehouseReceipt);
router.post('/warehouse-receipt/delete', deleteWarehouseReceipt);


module.exports = router;
