const mydb = require('../ultis/mydb');
const tableName = 'sanpham'

module.exports = class Product {

    static async getProductsByPage(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const dataPromise = mydb.load(`SELECT * FROM ${tableName} LIMIT ${limit} OFFSET ${offset}`);
            const data = await dataPromise;

            const totalCountPromise = mydb.load(`SELECT COUNT(*) as total FROM ${tableName}`);
            const totalCountResult = await totalCountPromise;

            if (Array.isArray(totalCountResult) && totalCountResult.length > 0) {
                const totalItems = totalCountResult[0].total;
                if (Number.isInteger(totalItems) && totalItems > 0) {
                    const totalPage = Math.ceil(totalItems / pageSize);
                    return {
                        data: data,
                        totalPage: totalPage,
                        total: totalItems,
                    };
                }
            }
        } catch (error) {
            console.error('Error in getProductsByPage:', error);
            throw error;
        }
    }

    static async searchProductsByNameAndPage(page, pageSize, searchValue) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const searchCondition = searchValue ? `WHERE TenSP LIKE '%${searchValue}%'` : '';
            const query = `SELECT * FROM ${tableName} ${searchCondition} LIMIT ${limit} OFFSET ${offset}`;

            const dataPromise = mydb.load(query);
            const data = await dataPromise;

            const totalCountQuery = `SELECT COUNT(*) as total FROM ${tableName} ${searchCondition}`;
            const totalCountPromise = mydb.load(totalCountQuery);
            const totalCountResult = await totalCountPromise;

            if (Array.isArray(totalCountResult) && totalCountResult.length > 0) {
                const totalItems = totalCountResult[0].total;
                if (Number.isInteger(totalItems) && totalItems > 0) {
                    const totalPage = Math.ceil(totalItems / pageSize);
                    return {
                        data: data,
                        totalPage: totalPage,
                        total: totalItems,
                    };
                }
            }
        } catch (error) {
            console.error('Error in searchProductsByNameAndPage:', error);
            throw error;
        }
    }

    static getAll() {
        return mydb.load(`select * from ${tableName}`);
    }

    static getAllAvailable() {
        return mydb.load(`select * from ${tableName} where TrangThai = true`);
    }

    static getByID(id){
        return mydb.load(`select * from ${tableName} where MaSP = ${id}`)
    }

    static addRow(entity) {
        return mydb.add(tableName, entity);
    }

    static updateRow(entity) {
        const condition = {
            MaSP: entity.MaSP
        }
        delete entity.MaSP;
        return mydb.update(tableName, entity, condition);
    }

    static deleteRowByID(productID) {
        const condition = {
            MaSP: productID
        }
        return mydb.delete(tableName, condition);
    }
}