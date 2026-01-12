export class Transaction {
    constructor(book, member, issueDate = new Date()) {
        this.book = book;
        this.member = member;
        this.issueDate = issueDate;
        this.returnDate = null;
    }

    closeTransaction() {
        this.returnDate = new Date();
    }
}
