export default class BorrowTransaction {
  constructor(user, book) {
    this.user = user;
    this.book = book;
    this.overdue = false;
  }

  markOverdue() {
    this.overdue = true;
  }

  isOverdue() {
    return this.overdue;
  }
}
