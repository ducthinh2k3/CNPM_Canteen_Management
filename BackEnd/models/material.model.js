const mydb = require('../ultis/mydb');
const tableName = 'nguyenlieu'

module.exports = class Material {
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
            console.error('Error in getByPage:', error);
            throw error;
        }
    }

    static async searchByNameAndPage(page, pageSize, searchValue) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const searchCondition = searchValue ? `WHERE TenNguyenLieu LIKE '%${searchValue}%'` : '';
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
            console.error('Error in searchByNameAndPage:', error);
            throw error;
        }
    }

    static getAll() {
        return mydb.load(`select * from ${tableName}`);
    }

    // loai nhung nguyen lieu da duoc them vao chi tiet phieu nhap
    // static getAllExceptExits(receiptID){
    //     return mydb.load(`select * from ${tableName}
    //                         where MaNguyenLieu not in (
    //                             select MaNguyenLieu from chitietphieunhap
    //                             where MaPhieu = ${receiptID}
    //                         )`);
    // }
    static async getAllExceptExits(receiptID, page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const query = `
                SELECT * FROM ${tableName}
                WHERE MaNguyenLieu NOT IN (
                    SELECT MaNguyenLieu FROM chitietphieunhap
                    WHERE MaPhieu = ${receiptID}
                )
                LIMIT ${limit} OFFSET ${offset}
            `;
            const data = await mydb.load(query);
            const totalCountQuery = `SELECT COUNT(*) as total FROM ${tableName} 
                                        WHERE MaNguyenLieu NOT IN (SELECT MaNguyenLieu FROM chitietphieunhap 
                                            WHERE MaPhieu = ${receiptID})`;
            const totalCountPromise = await mydb.load(totalCountQuery);
            const totalItems = totalCountPromise[0].total;
            const totalPage = Math.ceil(totalItems / pageSize);

            return {
                data: data,
                totalPage: totalPage,
                total: totalItems,
            };
        } catch (error) {
            console.error('Error in getAllExceptExits:', error);
            throw error;
        }
    }


    static searchByNameAndPaging = async (receiptID, name, page, pageSize) => {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const query = `
              SELECT * FROM ${tableName}
              WHERE MaNguyenLieu NOT IN (
                  SELECT MaNguyenLieu FROM chitietphieunhap
                  WHERE MaPhieu = ${receiptID}
              ) AND TenNguyenLieu LIKE '%${name}%'
              LIMIT ${limit} OFFSET ${offset}
          `;

            const data = await mydb.load(query);

            const totalCountQuery = `
            SELECT COUNT(*) as total FROM ${tableName}
            WHERE MaNguyenLieu NOT IN (
                SELECT MaNguyenLieu FROM chitietphieunhap
                WHERE MaPhieu = ${receiptID}
            ) AND TenNguyenLieu LIKE '%${name}%'
          `;

            const totalCountPromise = await mydb.load(totalCountQuery);
            const totalItems = totalCountPromise[0].total;

            const totalPage = Math.ceil(totalItems / pageSize);

            return {
                data: data,
                totalPage: totalPage,
                total: totalItems,
            };
        } catch (error) {
            console.error('Error in searchByNameAndPaging:', error);
            throw error;
        }
    };
    // static getByID(id){
    //     return mydb.load(`select * from ${tableName} where UserID = ${id}`)
    // } 

    static addRow(entity) {
        return mydb.add(tableName, entity);
    }

    static updateRow(entity) {
        const condition = {
            MaNguyenLieu: entity.MaNguyenLieu
        }
        delete entity.MaNguyenLieu;
        return mydb.update(tableName, entity, condition);
    }

    static updateRowByProID(entity) {
        const condition = {
            MaSP: entity.MaSP
        }
        delete entity.MaSP;
        return mydb.update(tableName, entity, condition);
    }

    static deleteRowByID(materialID) {
        const condition = {
            MaNguyenLieu: materialID
        }
        return mydb.delete(tableName, condition);
    }
}