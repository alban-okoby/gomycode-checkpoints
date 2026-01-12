export class Librarian {
    constructor(name, bookRepo) {
        this.name = name;
        this.books = bookRepo;
    }

    addBook(book) {
        this.books.push(book);
        console.log(`Book "${book.title}" added to the library.`);
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
            console.log(`Book "${book.title}" removed from the library.`);
        }
    }

    issueBook(book, member) {
        member.borrowBook(book);
    }

    acceptReturn(book, member) {
        member.returnBook(book);
    }
}
