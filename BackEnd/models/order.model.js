const mydb = require('../ultis/mydb');
const tableName = 'donhang';
const tableName1 = 'chitietdonhang';

module.exports = class DonHang {
    static addRow(entity){
        return mydb.add(tableName, entity);
    }

    static addRowDetail(entity){
      return mydb.add(tableName1, entity);
  }

    static async getRevenueByHour(startDate) {
        try {
          const query = `
            SELECT 
              HOUR(NgayMua) AS Hour,
              COUNT(*) AS SoDonHang,
              SUM(ThanhTien) AS DoanhThu
            FROM ${tableName}
            WHERE DATE(NgayMua) = '${startDate}'
            GROUP BY HOUR(NgayMua)
          `;
    
          const dataPromise = mydb.load(query);
          const data = await dataPromise;

          console.log('*****data: ', data, );
    
          const totalOrdersQuery = `
            SELECT COUNT(*) AS TotalOrders
            FROM ${tableName}
            WHERE DATE(NgayMua) = '${startDate}'
          `;
          const totalOrdersPromise = mydb.load(totalOrdersQuery);
          const totalOrders = await totalOrdersPromise;
    
          const totalRevenueQuery = `
            SELECT SUM(ThanhTien) AS TotalRevenue
            FROM ${tableName}
            WHERE DATE(NgayMua) = '${startDate}'
          `;
          const totalRevenuePromise = mydb.load(totalRevenueQuery);
          const totalRevenue = await totalRevenuePromise;
    
          return {
            hourlyData: data,
            totalOrders: totalOrders[0].TotalOrders,
            totalRevenue: totalRevenue[0].TotalRevenue,
          };
        } catch (error) {
          console.error('Error in getRevenueByHour:', error);
          throw error;
        }
      }
}