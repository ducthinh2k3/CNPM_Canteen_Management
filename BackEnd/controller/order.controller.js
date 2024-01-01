const order = require('../models/order.model');

const saveOrder = async (req, res, next) => {
    try {
        const entity = {
            NgayMua: new Date(),
            MaKM: req.body.MaKM,
            HinhThuc: req.body.HinhThuc,
            ThanhTien: parseInt(req.body.ThanhTien)
        }
        const rs = await order.addRow(entity);
        res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/order.html?id=${entity.NgayMua}`)
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