const Trade = require('../models/trade.model');
const Warehouse = require('../models/warehouse.model')
const path = require('path')
const puppeteer = require('puppeteer')
const excelJS = require('exceljs')

const getTradePage = async (req, res, next) => {
    try{
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 4; // số dòng trên 1 trang
        const startDate = req.query.startDate; // số dòng trên 1 trang
        const endDate = req.query.endDate; // số dòng trên 1 trang
        const result = await Trade.getTradeByPage(page, pageSize, startDate, endDate);
        res.json({ success: true, result: result });
    } catch (error) {
        res.json({ success: false, message: "Warehouse-receipt not found or could not be deleted." });
        next(error);
    }
}

const getAllTradeInfo = async (req, res, next) => {
    try{
        const startDate = req.query.startDate; // số dòng trên 1 trang
        const endDate = req.query.endDate; // số dòng trên 1 trang
        const result = await Trade.getAllTrade(startDate, endDate);
        res.json({ success: true, result: result });
    } catch (error) {
        res.json({ success: false, message: "Trade not found." });
        next(error);
    }
}

const getExpensePage = async (req, res, next) => {
    try{
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 4; // số dòng trên 1 trang
        const result = await Trade.getExpenseByPage(page, pageSize);
        res.json({ success: true, result: result });
    } catch (error) {
        res.json({ success: false, message: "Warehouse-receipt not found or could not be deleted." });
        next(error);
    }
}

const generateReport = async (req, res, next) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`http://127.0.0.1:5500/FrontEnd/Admin/report-file.html?startDate=${startDate}&endDate=${endDate}`, {
            waitUntil: "networkidle2"
        });

        await page.setViewport({ width: 1680, height: 1050 });
        const pdfn = await page.pdf({
            path: `${path.join(__dirname, '../public/files', "report.pdf")}`,
            format: "A4",
            printBackground: true
        });

        await browser.close();
        const pdfURL = path.join(__dirname, '../public/files', "report.pdf")

        res.set({
            "Content-Type": "application/pdf",
            "Content-Length": pdfn.length
        })
        res.sendFile(pdfURL)
    } catch (error) {
        res.json({ success: false, message: "Fail" });
        next(error);
    }
}

const generateReportExcel = async (req, res, next) => {
    try{
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Data");

        // Thêm dòng header với nội dung "BANG PHIEU NHAP KHO"
        const titleRow = worksheet.addRow(["Bảng Phiếu Nhập Kho"]);
        titleRow.getCell(1).font = { bold: true, size: 16 };

        // Merge ô cho dòng titleRow
        worksheet.mergeCells(`A1:D1`);

        // Thêm dòng tiêu đề cho cột
        const headerRow = worksheet.addRow(["STT", "Mã Phiếu", "Ngày lập", "Tổng tiền"]);
        headerRow.font = { bold: true };

        let counter = 1;
        const warehouseData = await Warehouse.getAll();
        warehouseData.forEach(item => {
            item.stt = counter;
            item.TongTien = parseFloat(item.TongTien)
            worksheet.addRow([counter, item.MaPhieu, item.NgayLap, item.TongTien]);
            counter++;
        });

        // Tính tổng cộng và thêm dòng cuối cùng
        const totalRow = worksheet.addRow(["", "", "Tổng Cộng", { formula: `SUM(D3:D${counter + 1})` }]);
        totalRow.font = { bold: true };

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
        )

        res.setHeader("Content-Disposition", `attachment; filename=report.xlsx`)
        return workbook.xlsx.write(res).then(() => {
            res.status(200)
        })
    } catch (error) {
        res.json({ success: false, message: "Fail" });
        next(error);
    }
}

// const searchUsersByName = async (req, res, next) => {
//     try {
//         const name = req.query.name;
//         const page = req.query.page || 1;
//         const pageSize = req.query.pageSize || 4; // Số lượng mục trên mỗi trang


//         if (!name) {
//             return res.status(400).json({ success: false, message: 'Missing required parameter: name' });
//         }

//         const searchResult = await User.searchByNameWithPagination(name, page, pageSize);
//         res.json({ success: true, result: searchResult });
//     } catch (error) {
//         console.error('Error in searchUsersByName:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

const addExpense = async (req, res, next) => {
    try{
        const entity = {
            LoaiPhieu: req.body.LoaiPhieu,
            NgayLap: req.body.NgayLap,
            MoTa: req.body.MoTa,
            TongTien: req.body.TongTien,
        }
        const rs = await Trade.addRow(entity);
        res.json({ success: true, message: "Add successfully." });
    } catch (error) {
        res.json({ success: false, message: "Add fail." });
        next(error);
    }
}

const updateExpense = async (req, res, next) => {
    try{
        const entity = {
            MaGiaoDich: req.body.expensesEditCode,
            MoTa: req.body.expensesEditDetail,
            TongTien: req.body.expensesEditAmount,
        }
        const rs = await Trade.updateRow(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/expense.html')
    } catch (error) {
        next(error);
    }
}

const deleteExpense = async (req, res, next) => {
    try{
        const expenseCode = req.query.id;
        const result = await Trade.deleteRowByID(expenseCode);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Admin/staff.html')
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
    addExpense,
    getTradePage,
    getExpensePage,
    updateExpense,
    deleteExpense,
    getAllTradeInfo,
    generateReport,
    generateReportExcel
}