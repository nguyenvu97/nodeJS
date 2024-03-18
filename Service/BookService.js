const Book = require("../Model/Book");

class BookService {
    static async addBook(
      title, 
      ProductName,
      ProductCode,
      ProductDate,
      ProductStoreCode,
      price) {
      try {
        // Tạo một bản ghi mới với dữ liệu được cung cấp
        const newBook = await Book.create({
          title,
          ProductName,
          ProductCode,
          ProductDate,
          ProductStoreCode,
          price
        });
  
        // Trả về đối tượng Book mới được tạo
        return newBook;
      } catch (error) {
        // Nếu có lỗi, ném nó để bắt ở nơi gọi phương thức
        throw error;
      }
    }
    static async getAllBook(){
      try {
          const sortedProducts = await Book.findAll({
              order: [['ProductStoreCode', 'DESC']]
          });
          return sortedProducts;
      } catch(error) {
          throw error;
      }
  }
  
  
    static async deleteBook(bookId) {
      try {
        const bookToDelete = await Book.findByPk(bookId);
    
        if (!bookToDelete) {
          throw new Error('Book not found');
        }
    
        // Lưu thông tin cuốn sách trước khi xóa
        const deletedBookData = {
          id: bookToDelete.id,
          title: bookToDelete.title,
          ProductCode: bookToDelete.ProductCode,
          ProductDate: bookToDelete.ProductDate,
          ProductName: bookToDelete.ProductName,
          ProductStoreCode: bookToDelete.ProductStoreCode,
          price: bookToDelete.price
        };
    
        // Sử dụng phương thức destroy để xóa cuốn sách từ cơ sở dữ liệu
        await bookToDelete.destroy();
    
        // Trả về thông tin cuốn sách đã xóa
        return { success: true, message: 'Book deleted successfully', deletedBook: deletedBookData };
      } catch (error) {
        throw error;
      }
    }
    
    static async updateBook(bookId, updatedBookData) {
      try {
          // Tìm cuốn sách cần cập nhật
          const bookToUpdate = await Book.findByPk(bookId);
  
          if (!bookToUpdate) {
              throw new Error('Book not found');
          }
  
          // Cập nhật thông tin cuốn sách
          await bookToUpdate.update(updatedBookData);
  
          // Trả về cuốn sách đã được cập nhật
          return bookToUpdate;
      } catch (error) {
          throw error;
      }
  }
  // static async getBookById(bookId) {
  //   try {
  //     const book = await Book.findByPk(bookId);

  //     if (!book) {
  //       throw new Error('Book not found');
  //     }

  //     return { success: true, book };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
  
  module.exports = BookService;