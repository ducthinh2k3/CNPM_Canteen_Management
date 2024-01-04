const mydb = require('../ultis/mydb');
const tableName = 'giaodich'

module.exports = class User {
    static async getTradeByPage(page, pageSize, startDate, endDate) {
        try {;
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const dataPromise = mydb.load(`SELECT * FROM ${tableName}
                                            WHERE DATE(NgayLap) BETWEEN '${startDate}' AND '${endDate}' 
                                            LIMIT ${limit} OFFSET ${offset}`);
            const data = await dataPromise;

            const totalCountPromise = mydb.load(`SELECT COUNT(*) as total FROM ${tableName}
                                            WHERE DATE(NgayLap) BETWEEN '${startDate}' AND '${endDate}' `);
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

    static async getExpenseByPage(page, pageSize) {
        try {;
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const dataPromise = mydb.load(`SELECT * FROM ${tableName} WHERE LoaiPhieu = 'ChiKhac' LIMIT ${limit} OFFSET ${offset}`);
            const data = await dataPromise;

            const totalCountPromise = mydb.load(`SELECT COUNT(*) as total FROM ${tableName} WHERE LoaiPhieu = 'ChiKhac'`);
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

    // static async searchByNameWithPagination(name, page, pageSize) {
    //     try {
    //         const offset = (page - 1) * pageSize;
    //         const limit = pageSize;
    
    //         const dataPromise = mydb.load(`SELECT * FROM ${tableName} WHERE HoTen LIKE '%${name}%' LIMIT ${limit} OFFSET ${offset}`);
    //         const data = await dataPromise;
    
    //         const totalCountPromise = mydb.load(`SELECT COUNT(*) as total FROM ${tableName} WHERE HoTen LIKE '%${name}%'`);
    //         const totalCountResult = await totalCountPromise;
    
    //         const totalItems = totalCountResult[0].total;
    
    //         const totalPage = Math.ceil(totalItems / pageSize);
    
    //         return {
    //             data: data,
    //             totalPage: totalPage,
    //             total: totalItems,
    //         };
    //     } catch (error) {
    //         console.error('Error in searchByNameWithPagination:', error);
    //         throw error;
    //     }
    // }

    // static async searchByName(name) {
    //     const result = await mydb.load(`SELECT * FROM ${tableName} WHERE HoTen LIKE '%${name}%'`);
    //     return result;
    //   }

    static getAllTrade(startDate, endDate) {
        return mydb.load(`SELECT * FROM ${tableName}
                            WHERE DATE(NgayLap) BETWEEN '${startDate}' AND '${endDate}'`);
    }

    // static getByID(id) {
    //     return mydb.load(`select * from ${tableName} where UserID = ${id}`)
    // }

    static addRow(entity) {
        return mydb.add(tableName, entity);
    }

    static updateRow(entity) {
        const condition = {
            MaGiaoDich: entity.MaGiaoDich
        }
        delete entity.MaGiaoDich;
        return mydb.update(tableName, entity, condition);
    }

    static deleteRowByID(expenseCode) {
        const condition = {
            MaGiaoDich: expenseCode
        }
        return mydb.delete(tableName, condition);
    }

}