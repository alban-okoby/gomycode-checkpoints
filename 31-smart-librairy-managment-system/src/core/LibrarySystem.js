import NotificationService from "./NotificationService.js";
import BorrowTransaction from "../transactions/BorrowTransaction.js";

class LibrarySystem {
  static instance;

  constructor() {
    if (LibrarySystem.instance) {
      return LibrarySystem.instance;
    }

    this.users = [];
    this.books = [];
    this.transactions = [];
    this.notificationService = new NotificationService();

    LibrarySystem.instance = this;
  }

  static getInstance() {
    if (!LibrarySystem.instance) {
      LibrarySystem.instance = new LibrarySystem();
    }
    return LibrarySystem.instance;
  }

  addUser(user) {
    this.users.push(user);
    this.notificationService.subscribe(user);
  }

  addBook(book) {
    this.books.push(book);
  }

  borrowBook(user, book) {
    if (!book.available) {
      console.log("Book not available");
      return;
    }

    book.borrow();
    const transaction = new BorrowTransaction(user, book);
    this.transactions.push(transaction);

    console.log(`${user.name} borrowed "${book.title}"`);
  }

  returnBook(book) {
    book.returnBook();
    console.log(`Returned "${book.title}"`);
  }

  checkOverdues() {
    this.transactions.forEach(transaction => {
      if (transaction.isOverdue()) {
        this.notificationService.notify(
          `Overdue book: ${transaction.book.title}`
        );
      }
    });
  }
}

export default LibrarySystem;
