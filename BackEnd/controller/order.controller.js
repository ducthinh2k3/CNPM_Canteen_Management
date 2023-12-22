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
    res.redirect(`http://127.0.0.1:5500/FrontEnd/Admin/order.html?id=${ entity.NgayMua }`)
} catch (error) {
    next(error);
}
}
module.exports = {
    saveOrder
};