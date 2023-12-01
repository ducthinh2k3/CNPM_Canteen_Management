const mydb = require('../ultis/mydb');
const tableName = 'user'

module.exports = class User {
    static getAll(){
        return mydb.load(`select * from ${tableName}`);
    }

    static addRow(entity){
        return mydb.add(tableName, entity);
    }
}