const mydb = require('../ultis/mydb');
const tableName = 'donhang'

module.exports = class DonHang {
    static getAll(){
        return mydb.load(`select * from ${tableName}`);
    }

    static addRow(entity){
        return mydb.add(tableName, entity);
    }
}