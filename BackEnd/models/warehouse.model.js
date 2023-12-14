const mydb = require('../ultis/mydb');
const tableName = 'phieunhapkho'
const tableNameDetail = 'chitietphieunhap'

module.exports = class Warehouse {
    // Warehouse
    static getAll(){
        return mydb.load(`select * from ${tableName}`);
    }

    static addRow(entity){
        return mydb.add(tableName, entity);
    }

    static updateRow(entity){
        const condition = {
            MaPhieu: entity.MaPhieu,
        }
        delete entity.MaPhieu
        return mydb.update(tableName, entity, condition);
    }

    static deleteRowByID(receiptID){
        const condition = {
            MaPhieu: receiptID
        }
        return mydb.delete(tableName, condition);
    }

    // Warehouse detail
    static getAllDetailWithID(receiptID){
        return mydb.load(`select ${tableNameDetail}.*, nguyenlieu.TenNguyenLieu, nguyenlieu.DonGia, nguyenlieu.DonVi
                            from ${tableNameDetail} inner join nguyenlieu
                            on nguyenlieu.MaNguyenLieu = ${tableNameDetail}.MaNguyenLieu
                            where ${tableNameDetail}.MaPhieu = ${receiptID}`);
    }

    static addRowDetail(entity){
        return mydb.add(tableNameDetail, entity);
    }

    static updateRowDetail(entity){
        const condition1 = {
            MaPhieu: entity.MaPhieu,
        }
        const condition2 = {
            MaNguyenLieu: entity.MaNguyenLieu
        }
        delete entity.MaNguyenLieu;
        delete entity.MaPhieu
        return mydb.update2Condition(tableNameDetail, entity, condition1, condition2);
    }

    static deleteRowDetailBy2ID(receiptID, materialID){
        const condition1 = {
            MaPhieu: receiptID
        }

        const condition2 = {
            MaNguyenLieu: materialID
        }
        return mydb.delete2Condition(tableNameDetail, condition1, condition2);
    }

    static deleteRowDetail(receiptID){
        const condition = {
            MaPhieu: receiptID
        }

        return mydb.delete(tableNameDetail, condition)
    }
}