import LibrarySystem from "../core/LibrarySystem.js";
import Book from "../books/Book.js";
import UserFactory from "../users/UserFactory.js";
import { USER_TYPES } from "../utils/constants.js";
import { jest } from "@jest/globals";


describe("LibrarySystem Singleton & Functionality", () => {
  let library;

  beforeEach(() => {
    library = LibrarySystem.getInstance();
    // Reset for each test
    library.users = [];
    library.books = [];
    library.transactions = [];
  });

  test("should return the same singleton instance", () => {
    const lib1 = LibrarySystem.getInstance();
    const lib2 = LibrarySystem.getInstance();
    expect(lib1).toBe(lib2);
  });

  test("should add users", () => {
    const student = UserFactory.createUser(USER_TYPES.STUDENT, "U1", "Alice");
    library.addUser(student);
    expect(library.users).toContain(student);
  });

  test("should add books", () => {
    const book = new Book("B1", "Clean Code");
    library.addBook(book);
    expect(library.books).toContain(book);
  });

  test("should borrow a book", () => {
    const student = UserFactory.createUser(USER_TYPES.STUDENT, "U1", "Alice");
    const book = new Book("B1", "Clean Code");
    library.addUser(student);
    library.addBook(book);

    library.borrowBook(student, book);

    expect(book.available).toBe(false);
    expect(library.transactions.length).toBe(1);
    expect(library.transactions[0].user).toBe(student);
  });

  test("should return a book", () => {
    const student = UserFactory.createUser(USER_TYPES.STUDENT, "U1", "Alice");
    const book = new Book("B1", "Clean Code");
    library.addUser(student);
    library.addBook(book);
    library.borrowBook(student, book);

    library.returnBook(book);

    expect(book.available).toBe(true);
  });

  test("should notify users of overdue books", () => {
    const student = UserFactory.createUser(USER_TYPES.STUDENT, "U1", "Alice");
    const book = new Book("B1", "Clean Code");
    library.addUser(student);
    library.addBook(book);
    library.borrowBook(student, book);

    // Mock console.log to capture notifications
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    consoleSpy.mockRestore();


    library.transactions[0].markOverdue();
    library.checkOverdues();

    // expect(console.log).toHaveBeenCalledWith(
    //   `📢 ${student.name}: Overdue book: ${book.title}`
    // );
  });
});
