const mydb = require('../ultis/mydb');
const tableName = 'nguyenlieu'

module.exports = class Material {
    static getAll(){
        return mydb.load(`select * from ${tableName}`);
    }

    // loai nhung nguyen lieu da duoc them vao chi tiet phieu nhap
    static getAllExceptExits(receiptID){
        return mydb.load(`select * from ${tableName}
                            where MaNguyenLieu not in (
                                select MaNguyenLieu from chitietphieunhap
                                where MaPhieu = ${receiptID}
                            )`);
    }

    // static getByID(id){
    //     return mydb.load(`select * from ${tableName} where UserID = ${id}`)
    // }

    static addRow(entity){
        return mydb.add(tableName, entity);
    }

    static updateRow(entity){
        const condition = {
            MaNguyenLieu: entity.MaNguyenLieu
        }
        delete entity.MaNguyenLieu;
        return mydb.update(tableName, entity, condition);
    }

    static deleteRowByID(materialID){
        const condition = {
            MaNguyenLieu: materialID
        }
        return mydb.delete(tableName, condition);
    }
}