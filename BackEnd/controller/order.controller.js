const order = require('../models/order.model');

const saveOrder = async (req, res, next) => {
  try{
    const entity = {
        NgayMua: new Date(),
        MaKM: req.body.MaKM,
        HinhThuc: req.body.HinhThuc,
        ThanhTien: parseInt(req.body.ThanhTien)
    }
    const rs = await order.addRow(entity);
} catch (error) {
    next(error);
}
}
module.exports = {
    saveOrder
};