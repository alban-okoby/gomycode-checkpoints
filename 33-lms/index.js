import { EntityFactory } from './modules/factory.js';
import { Librarian } from './modules/librarian.js';
import { FineStrategy, simpleFine, premiumFine } from './modules/strategy.js';
import { NotificationService } from './modules/observer.js';

// Create books & members using factory
const book1 = EntityFactory.createBook(1, "1984", "George Orwell", "12345");
const book2 = EntityFactory.createBook(2, "The Hobbit", "J.R.R. Tolkien", "67890");

const member1 = EntityFactory.createMember(1, "Alice", "alice@example.com");
const member2 = EntityFactory.createMember(2, "Bob", "bob@example.com");

// Setup librarian with book repository (DI)
const librarian = new Librarian("Mr. Smith", [book1, book2]);

// Setup Observer
const notifier = new NotificationService();
book1.addObserver(notifier);
book2.addObserver(notifier);

// Borrow & Return Books
librarian.issueBook(book1, member1); // Alice borrows "1984"
librarian.acceptReturn(book1, member1); // Alice returns "1984"
librarian.issueBook(book1, member2); // Bob borrows "1984"

// Fine Calculation Example
const transaction = { issueDate: new Date('2026-01-01'), returnDate: new Date('2026-01-20') };
const fineCalc = new FineStrategy();
console.log("Simple Fine: $", fineCalc.calculate(transaction, simpleFine));
console.log("Premium Fine: $", fineCalc.calculate(transaction, premiumFine));
