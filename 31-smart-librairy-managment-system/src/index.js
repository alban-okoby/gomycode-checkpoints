import LibrarySystem from "./core/LibrarySystem.js";
import UserFactory from "./users/UserFactory.js";
import Book from "./books/Book.js";
import { USER_TYPES } from "./utils/constants.js";

const library = LibrarySystem.getInstance();

// Create users
const student = UserFactory.createUser(USER_TYPES.STUDENT, "U1", "Alice");
const teacher = UserFactory.createUser(USER_TYPES.TEACHER, "U2", "Mr. Bob");

// Add users
library.addUser(student);
library.addUser(teacher);

// Create books
const book1 = new Book("B1", "Clean Code");
const book2 = new Book("B2", "Design Patterns");

// Add books
library.addBook(book1);
library.addBook(book2);

// Borrow books
library.borrowBook(student, book1);
library.borrowBook(teacher, book2);

// Simulate overdue
library.transactions[0].markOverdue();

// Notify users
library.checkOverdues();
