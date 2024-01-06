const mydb = require('../ultis/mydb');
module.exports = class ProductKitchen {
    static GetListProductNotComplete() {
        return mydb.load(`select DH.STT, SP.TenSp, CTDH.SoLuong,CTDH.TrangThai,CTDH.MaSP from ChiTietDonHang AS CTDH join DonHang AS DH on CTDH.STT = DH.STT
        and CTDH.NgayMua = DH.NgayMua Join SanPham AS SP on CTDH.MaSP = SP.MaSP
        where DATE(CTDH.NgayMua) = CURRENT_DATE() and (CTDH.TrangThai Is NULL OR CTDH.TrangThai = 0) `);
    }
    static GetListProductComplete() {
        return mydb.load(`select DH.STT, SP.TenSp, CTDH.SoLuong,CTDH.TrangThai,CTDH.MaSP from ChiTietDonHang AS CTDH join DonHang AS DH on CTDH.STT = DH.STT
        and CTDH.NgayMua = DH.NgayMua Join SanPham AS SP on CTDH.MaSP = SP.MaSP
        where DATE(CTDH.NgayMua) = CURRENT_DATE() and CTDH.TrangThai !=0 `);
    }
    static notifyKitchenPageComplete(entity) {
        const condition = {
            STT: entity.STT,
            MaSP: entity.MaSP
        }
        return mydb.updateKitchen('chitietdonhang', entity, condition);
    }
    static notifyKitchenPageNotComplete(entity) {
        const condition = {
            STT: entity.STT,
            MaSP: entity.MaSP
        }
        return mydb.updateKitchen('chitietdonhang', entity, condition);
    }
    static notifySoldOut(enity) {
        const condition = {
            MaSP: enity.MaSP
        }
        return mydb.update('sanpham', enity, condition);
    }
}