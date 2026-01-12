import Book from "../books/Book.js";

describe("Book class", () => {
  test("should initialize correctly", () => {
    const book = new Book("B1", "Clean Code");
    expect(book.id).toBe("B1");
    expect(book.title).toBe("Clean Code");
    expect(book.available).toBe(true);
  });

  test("should borrow and return book", () => {
    const book = new Book("B1", "Clean Code");
    book.borrow();
    expect(book.available).toBe(false);

    book.returnBook();
    expect(book.available).toBe(true);
  });

  test("should throw error if borrowing unavailable book", () => {
    const book = new Book("B1", "Clean Code");
    book.borrow();
    expect(() => book.borrow()).toThrow("Book not available");
  });
});
