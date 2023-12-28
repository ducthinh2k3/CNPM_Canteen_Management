const mydb = require('../ultis/mydb');
const tableName = 'user'

module.exports = class User {
    static async getUsersByPage(page, pageSize) {
        try {;
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const dataPromise = mydb.load(`SELECT * FROM ${tableName} LIMIT ${limit} OFFSET ${offset}`);
            const data = await dataPromise;

            const totalCountPromise = mydb.load(`SELECT COUNT(*) as total FROM ${tableName}`);
            const totalCountResult = await totalCountPromise;

            if (totalCountResult && Array.isArray(totalCountResult) && totalCountResult.length > 0) {
                const totalPage = Math.ceil(totalCountResult[0].total / pageSize);
                return {
                    data: data,
                    totalPage: totalPage,
                    total: totalCountResult[0].total,
                };
            } else {
                console.error('Total count is undefined or not an array:', totalCountResult);
                throw new Error('Error in getUsersByPage: Total count is undefined or not an array');
            }
        } catch (error) {
            console.error('Error in getUsersByPage:', error);
            throw error;
        }
    }

    static async searchByNameWithPagination(name, page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
    
            const dataPromise = mydb.load(`SELECT * FROM ${tableName} WHERE HoTen LIKE '%${name}%' LIMIT ${limit} OFFSET ${offset}`);
            const data = await dataPromise;
    
            const totalCountPromise = mydb.load(`SELECT COUNT(*) as total FROM ${tableName} WHERE HoTen LIKE '%${name}%'`);
            const totalCountResult = await totalCountPromise;
    
            const totalItems = totalCountResult[0].total;
    
            const totalPage = Math.ceil(totalItems / pageSize);
    
            return {
                data: data,
                totalPage: totalPage,
                total: totalItems,
            };
        } catch (error) {
            console.error('Error in searchByNameWithPagination:', error);
            throw error;
        }
    }

    static async searchByName(name) {
        const result = await mydb.load(`SELECT * FROM ${tableName} WHERE HoTen LIKE '%${name}%'`);
        return result;
      }

    static getAll() {
        return mydb.load(`select * from ${tableName}`);
    }

<<<<<<< Updated upstream
    static addRow(entity){
        return mydb.add(tableName, entity);
    }
=======
    static getByID(id) {
        return mydb.load(`select * from ${tableName} where UserID = ${id}`)
    }

    static addRow(entity) {
        return mydb.add(tableName, entity);
    }

    static updateRow(entity) {
        const condition = {
            UserID: entity.UserID
        }
        delete entity.UserID;
        return mydb.update(tableName, entity, condition);
    }

    static deleteRowByID(userID) {
        const condition = {
            UserID: userID
        }
        return mydb.delete(tableName, condition);
    }
>>>>>>> Stashed changes
}