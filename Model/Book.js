const { DataTypes } = require('sequelize');
const sequelize = require('../ConnetDb/database');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductName: {
    type: DataTypes.STRING, // Thêm kiểu dữ liệu cho bookName, có thể là STRING hoặc một kiểu dữ liệu khác tùy vào yêu cầu của bạn
    allowNull: false, // Hoặc false nếu bookName không được phép null
  },
  ProductStoreCode: {
    type: DataTypes.STRING, // Thêm kiểu dữ liệu cho price, có thể là FLOAT hoặc một kiểu dữ liệu khác tùy vào yêu cầu của bạn
    allowNull: true, // Hoặc false nếu price không được phép null
  },
  price: {
    type: DataTypes.FLOAT, // Kiểu dữ liệu cho giá tiền là FLOAT
    allowNull: false,
  },
});



module.exports = Book;
