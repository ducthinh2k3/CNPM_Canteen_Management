const Trade = require('../models/trade.model');
const order = require('../models/order.model');
const Product = require('../models/product.model');
const Material = require('../models/material.model');

const saveOrder = async (req, res, next) => {
    try {
      const entity = {
          NgayMua: req.body.NgayMua,
          MaKM: req.body.MaKM,
          HinhThuc: req.body.HinhThuc,
          ThanhTien: parseInt(req.body.ThanhTien)
      }
      const rs = await order.addRow(entity);
      const rsTrade = await Trade.addRow({
        MaPhieu: rs.insertId,
        LoaiPhieu: 'Thu',
        NgayLap: entity.NgayMua,
        MoTa: 'Bán hàng',
        TongTien: entity.ThanhTien,
    })
      res.json(rs);
    } catch (error) {
        next(error);
    }
}

const saveOrderDetail = async (req, res, next) => {
  try {
    const orderDetail = {
        STT: req.body.STT,
        NgayMua: req.body.NgayMua,
        MaSP: req.body.MaSP,
        SoLuong: req.body.SoLuong
    }
    const rs1 = await order.addRowDetail(orderDetail);
    
    const sp = await Product.getByID(orderDetail.MaSP);
    const product = sp[0]
    if (product.DanhMuc == 2) {
      const entity = {
        MaSP: product.MaSP,
        SLTon: product.SLTon - orderDetail.SoLuong
      }
      await Product.updateRow(entity)
    } else {
      const material = {
        MaSP: product.MaSP,
        SLTon: product.SLTon - orderDetail.SoLuong
      }
      await Material.updateRowByProID(material);
    }

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
  getRevenueByHour,
  saveOrderDetail
};