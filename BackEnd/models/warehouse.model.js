const mydb = require('../ultis/mydb');
const tableName = 'phieunhapkho'
const tableNameDetail = 'chitietphieunhap'


module.exports = class Warehouse {

    static async getByPage(page, pageSize) {
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
    // static getAllDetailWithID(receiptID){
    //     return mydb.load(`select ${tableNameDetail}.*, nguyenlieu.TenNguyenLieu, nguyenlieu.DonGia, nguyenlieu.DonVi
    //                         from ${tableNameDetail} inner join nguyenlieu
    //                         on nguyenlieu.MaNguyenLieu = ${tableNameDetail}.MaNguyenLieu
    //                         where ${tableNameDetail}.MaPhieu = ${receiptID}`);
    // }
    static async getAllDetailWithID(receiptID, page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
    
            const query = `SELECT ${tableNameDetail}.*, nguyenlieu.TenNguyenLieu, nguyenlieu.DonGia, nguyenlieu.DonVi
                           FROM ${tableNameDetail}
                           INNER JOIN nguyenlieu ON nguyenlieu.MaNguyenLieu = ${tableNameDetail}.MaNguyenLieu
                           WHERE ${tableNameDetail}.MaPhieu = ${receiptID}
                           LIMIT ${limit} OFFSET ${offset}`;
    
            const dataPromise = mydb.load(query);
            const data = await dataPromise;
    
            const totalCountQuery = `SELECT COUNT(*) as total FROM ${tableNameDetail} WHERE MaPhieu = ${receiptID}`;
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
            console.error('Error in getAllDetailWithID:', error);
            throw error;
        }
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