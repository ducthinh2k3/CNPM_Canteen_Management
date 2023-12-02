const mydb = require('../ultis/mydb');
const tableName = 'user'

module.exports = class User {
    static getAll(){
        return mydb.load(`select * from ${tableName}`);
    }

    static getByID(id){
        return mydb.load(`select * from ${tableName} where UserID = ${id}`)
    }

    static addRow(entity){
        return mydb.add(tableName, entity);
    }

    static updateRow(entity){
        const condition = {
            UserID: entity.UserID
        }
        delete entity.UserID;
        return mydb.update(tableName, entity, condition);
    }
}