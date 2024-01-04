const {
    addExpense,
    getTradePage,
    getExpensePage,
    updateExpense,
    deleteExpense,
    getAllTradeInfo,
    generateReport,
    generateReportExcel
} = require('../controller/trade.controller');

const express = require('express');
const router = express.Router();

router.get('/trade/read', getTradePage);
router.post('/trade/add', addExpense);
router.get('/trade/report-pdf', generateReport);
router.get('/trade/report-excel', generateReportExcel);
router.get('/trade/read-all', getAllTradeInfo);
router.get('/expense/delete', deleteExpense);
router.get('/expense/read', getExpensePage);
router.post('/expense/edit', updateExpense);
router.get('/expense/delete', deleteExpense);

module.exports = router;