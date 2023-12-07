const mydb = require('../ultis/mydb');
const tableName = 'sanpham'

module.exports = class Product {
    static getAll(){
        return mydb.load(`select * from ${tableName}`);
    }

    // static getByID(id){
    //     return mydb.load(`select * from ${tableName} where UserID = ${id}`)
    // }

    static addRow(entity){
        return mydb.add(tableName, entity);
    }

    static updateRow(entity){
        const condition = {
            MaSP: entity.MaSP
        }
        delete entity.MaSP;
        return mydb.update(tableName, entity, condition);
    }

    static deleteRowByID(productID){
        const condition = {
            MaSP: productID
        }
        return mydb.delete(tableName, condition);
    }
}