const order = require('../models/order.model');

const saveOrder = async (req, res, next) => {
    try {
        const entity = {
            NgayMua: req.body.NgayMua,
            MaKM: req.body.MaKM,
            HinhThuc: req.body.HinhThuc,
            ThanhTien: parseInt(req.body.ThanhTien)
        }
        const rs = await order.addRow(entity);
        res.json(rs);

        const orderDetail = {
          NgayMua: req.body.NgayMua,
          MaSP: req.body.MaSP,
          SoLuong: req.body.SoLuong
        }
        const rs1 = await order.addRow(orderDetail);
        res.json(rs1);
    } catch (error) {
        next(error);
    }
}

const getRevenueByHour = async (req, res, next) => {
  console.log(req.query.startDate);
  try {
    const startDate = req.query.startDate;
    console.log(startDate);

    const result = await order.getRevenueByHour(startDate);

    res.json(result);
  } catch (error) {
    console.error('Error in getRevenueByHour controller:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
    saveOrder,
    getRevenueByHour
};