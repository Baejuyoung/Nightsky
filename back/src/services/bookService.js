import { Book } from "../db/index.js";

export default class BookService {
  /**
   * - 현재 존재하는 책 리스트를 반환해주는 함수
   * @param {number} userId - 유저 고유 ID
   * @returns
   */
  static async bookList(userId) {
    const list = await Book.bookList(userId);
    return list;
  }

  static async bookDiarys(userId, tag) {
    const list = await Book.bookDiarys(userId, tag);
    return list;
  }
}
